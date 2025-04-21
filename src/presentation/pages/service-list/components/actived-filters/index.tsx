import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Chip, Icon, Stack, Typography } from '@mui/material'
import { LoadServicesResult } from '@/domain/usecases'
import { ServiceStatus } from '@/domain/models'
import { State } from '@/presentation/pages/service-list/components/atoms'

type ServiceActivedFiltersProps = {
  loadServices: (search?: string, status?: ServiceStatus) => Promise<LoadServicesResult>
}

export const ServiceActivedFilters: React.FC<ServiceActivedFiltersProps> = (props) => {
  const setServices = useSetRecoilState(State.List.servicesState)
  const setTextSearch = useSetRecoilState(State.List.textSearchState)
  const [status, setStatus] = useRecoilState(State.List.statusFilterState)
  const [textInput, setTextInput] = useRecoilState(State.List.textInputSearchState)

  const handleLoadServices = React.useCallback(
    async (textSearch: string): Promise<void> => {
      const services = await props.loadServices(textSearch, status !== 'todos' ? status : undefined)!
      if (services?.success) {
        setServices(services.data)
        return
      }
    },
    [status],
  )

  const resetSearch = React.useCallback(() => {
    setTextSearch('')
    setTextInput('')
    setStatus('todos')
    handleLoadServices('')
  }, [])

  if (!textInput) {
    return undefined
  }

  return (
    <Stack direction="row" alignItems="center" px={2} mt={1}>
      <Chip
        color={'secondary'}
        variant="outlined"
        label={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption" fontWeight={600}>
              FILTRO:
            </Typography>
            <Typography variant="body2" fontWeight={300}>
              {textInput}
            </Typography>
          </Stack>
        }
        size="small"
        deleteIcon={<Icon color="secondary">close</Icon>}
        onDelete={resetSearch}
        sx={{ cursor: 'pointer' }}
      />
    </Stack>
  )
}
