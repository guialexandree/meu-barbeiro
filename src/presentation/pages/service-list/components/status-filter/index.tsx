import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { LoadServicesResult } from '@/domain/usecases'
import { ServiceStatus } from '@/domain/models'
import { State } from '@/presentation/pages/service-list/components/atoms'
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { useMobile } from '@/presentation/hooks'

type StatusFilterProps = {
  loadServices: (search?: string, status?: ServiceStatus) => Promise<LoadServicesResult>
}

export const StatusFilter: React.FC<StatusFilterProps> = (props) => {
  const { isMobile } = useMobile()
  const showFilter = useRecoilValue(State.List.showFilterState)
  const setServices = useSetRecoilState(State.List.servicesState)
  const [textSearch, setTextSearch] = useRecoilState(State.List.textSearchState)
  const [status, setStatus] = useRecoilState(State.List.statusFilterState)

  const handleChangeStatusFilter = React.useCallback(
    async (status: ServiceStatus): Promise<void> => {
      if (!status) return
      setStatus(status)
      setTextSearch(textSearch)
      const services = await props.loadServices(textSearch, status !== 'all' ? status : undefined)!
      if (services?.success) {
        setServices(services.data)
        return
      }
    },
    [textSearch],
  )

  return (
    <Stack
      spacing={1}
      px={2}
      pt={showFilter ? 1.2 : 0}
      direction="row"
      component="section"
      sx={{
        maxHeight: showFilter ? '100px' : '0px',
        opacity: showFilter ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.3s ease, opacity 0.3s ease',
      }}
    >
      <FormControl sx={{ mt: 2, minWidth: 80 }} color="secondary" fullWidth={isMobile}>
        <InputLabel
          id="service-filter-status-autowidth-label"
          color="secondary"
          sx={{
            '&.MuiFormLabel-root': { color: 'secondary.main' },
          }}
        >
          Status
        </InputLabel>

        <Select
          labelId="service-filter-status-autowidth-label"
          id="service-filter-status-autowidth"
          value={status}
          fullWidth
          size="small"
          onChange={(event) => {
            handleChangeStatusFilter(event.target.value as ServiceStatus)
          }}
          slotProps={{
            input: { sx: { color: 'grey.400' } },
          }}
          label="Status"
          sx={{ minWidth: 240 }}
        >
          <MenuItem value={'all'}>exibir todos</MenuItem>
          <MenuItem value={'actived'}>somente ativos</MenuItem>
          <MenuItem value={'deactivated'}>somentos inativo</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )
}
