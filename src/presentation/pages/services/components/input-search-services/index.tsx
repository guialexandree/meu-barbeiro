import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { LoadServicesResult } from '@/domain/usecases'
import { ServiceStatus } from '@/domain/models'
import { InputSearch } from '@/presentation/components'
import { State } from '@/presentation/pages/services/components/atoms'

type InputSearchServicesProps = {
  loadServices: (search?: string, status?: ServiceStatus) => Promise<LoadServicesResult>
}

export const InputSearchServices: React.FC<InputSearchServicesProps> = (props) => {
  const [services, setServices] = useRecoilState(State.List.servicesState)
  const search = useRecoilValue(State.List.servicesSearchState)
  const status = useRecoilValue(State.List.statusSearchState)
  const setNoResut = useSetRecoilState(State.noResultsServicesState)

  React.useEffect(() => {
    if (search && !services.length) {
      setNoResut(true)
    } else {
      setNoResut(false)
    }
  }, [search])

  const handleLoadServices = React.useCallback(async (): Promise<void> => {
    const services = await props.loadServices(search, status)!
    if (services.success) {
      setServices(services.data)
      return
    }
  }, [props, search, status])

  return (
    <InputSearch
      id="services-input-search"
      placeholder="Buscar por serviço"
      loadServices={handleLoadServices}
      valueState={State.List.servicesSearchState}
    />
  )
}
