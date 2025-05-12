import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Stack } from '@mui/material'
import { LoadServicesResult } from '@/domain/usecases'
import { ServiceStatus } from '@/domain/models'
import { InputSearch } from '@/presentation/components'
import { State } from '@/presentation/pages/service-list/components/atoms'
import { ServiceActivedFilters, StatusFilter } from '@/presentation/pages/service-list/components'

type ServiceFiltersProps = {
  loadServices: (search?: string, status?: ServiceStatus) => Promise<LoadServicesResult>
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = (props) => {
  const setServices = useSetRecoilState(State.List.servicesState)
  const setTextSearch = useSetRecoilState(State.List.textSearchState)
  const setTextInputSearch = useSetRecoilState(State.List.textInputSearchState)
  const [status, setStatus] = useRecoilState(State.List.statusFilterState)

  const handleLoadServices = React.useCallback(
    async (textSearch: string): Promise<void> => {
      setTextInputSearch(textSearch)
      const services = await props.loadServices(textSearch, status !== 'all' ? status : undefined)!
      if (services?.success) {
        setServices(services.data)
        return
      }
    },
    [status],
  )

  const resetSearch = React.useCallback(() => {
    setTextSearch('')
    setTextInputSearch('')
    setStatus('all')
    handleLoadServices('')
  }, [])

  return (
    <Stack sx={{ transition: 'height 0.3s ease' }}>
      <Stack>
        <InputSearch
          showFilters
          id="services-input-search"
          placeholder="Buscar"
          loadData={handleLoadServices}
          inputSearchState={State.List.textSearchState}
          showFiltersState={State.List.showFilterState}
          onReset={resetSearch}
        />
      </Stack>

      <ServiceActivedFilters loadServices={props.loadServices} />
      <StatusFilter loadServices={props.loadServices} />
    </Stack>
  )
}
