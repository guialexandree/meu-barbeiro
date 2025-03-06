import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { LoadServicesResult } from '@/domain/usecases'
import { ServiceStatus } from '@/domain/models'
import { InputSearch } from '@/presentation/components'
import { State } from '@/presentation/pages/services/components/atoms'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, useScrollTrigger } from '@mui/material'
import { useMobile } from '@/presentation/hooks'

type ServiceFiltersProps = {
  loadServices: (search?: string, status?: ServiceStatus) => Promise<LoadServicesResult>
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = (props) => {
  const navigate = useNavigate()
  const { isMobile } = useMobile()
  const [services, setServices] = useRecoilState(State.List.servicesState)
  const showFilter = useRecoilValue(State.List.showFilterState)
  const search = useRecoilValue(State.List.servicesSearchState)
  const [status, setStatus] = useRecoilState(State.List.statusFilterState)
  const setNoResut = useSetRecoilState(State.noResultsServicesState)
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: document.getElementById('services-input-search')?.getBoundingClientRect()?.top || 280,
    target: window
  })

  React.useEffect(() => {
    if (search && !services.length) {
      setNoResut(true)
    } else {
      setNoResut(false)
    }
  }, [search])

  const handleLoadServices = React.useCallback(async (textSearch: string): Promise<void> => {
    const services = await props.loadServices(textSearch, status !== 'todos' ? status : undefined)!
    if (services?.success) {
      setServices(services.data)
      return
    }
  }, [status])

  const handleChangeStatusFilter = React.useCallback(
    async (status: ServiceStatus): Promise<void> => {
      if (!status) return
      setStatus(status)
      const services = await props.loadServices(search, status !== 'todos' ? status : undefined)!
      if (services?.success) {
        setServices(services.data)
        return
      }
    },
    [search],
  )

  return (
    <Stack spacing={1} mb={1} sx={{ transition: 'height 0.3s ease' }}>
      <Stack spacing={1} direction="row" px={2} sx={{ position: trigger ? 'fixed' : 'relative', top: trigger ? 128 : 0, left: 0 }} zIndex={1}>
        <InputSearch
          id="services-input-search"
          placeholder="Buscar"
          loadData={handleLoadServices}
          inputSearchState={State.List.servicesSearchState}
          showFilters={State.List.showFilterState}
        />
        <Button
          variant="contained"
          id="service-create-button"
          onClick={() => {
            navigate('/servico/criar-novo')
          }}
          sx={{ borderRadius: 1 }}
        >
          Criar Novo
        </Button>
      </Stack>

      <Stack
        spacing={1}
        pt={1}
        px={2}
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
            size="small"
            onChange={(event) => {
              handleChangeStatusFilter(event.target.value as ServiceStatus)
            }}
            autoWidth
            slotProps={{
              input: { sx: { color: 'grey.400' } },
            }}
            label="Status"
            sx={{ minWidth: 240 }}
          >
            <MenuItem value={'todos'}>exibir todos</MenuItem>
            <MenuItem value={'ativo'}>somente ativos</MenuItem>
            <MenuItem value={'inativo'}>somentos inativo</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  )
}
