import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Alert } from '@mui/material'
import { ServiceStatus } from '@/domain/models'
import { LoadServicesResult } from '@/domain/usecases'
import { Factories } from '@/main/factories/usecases'
import { PageContainer } from '@/presentation/components'
import { ServiceList, ServiceFilters, ServiceFormAction } from '@/presentation/pages/service-list/components'
import { State } from '@/presentation/pages/service-list/components/atoms'

const ServicesListPage: React.FC = () => {
  const setLoading = useSetRecoilState(State.loadingServicesState)
  const setServices = useSetRecoilState(State.List.servicesState)
  const setError = useSetRecoilState(State.errorServicesState)
  const setSearch = useSetRecoilState(State.List.textSearchState)
  const setTextInputSearch = useSetRecoilState(State.List.textInputSearchState)

  const loadServices = React.useMemo(() => Factories.makeRemoteLoadServices(), [])

  const onInit = React.useCallback(async () => {
    setSearch('')
    setTextInputSearch('')
    const serviceResult = (await onLoadServices())!
    if (serviceResult?.success) {
      if (serviceResult.data) {
        setServices(serviceResult.data)
      }
      return
    }

    setError(serviceResult?.error || 'Erro ao carregar serviços')
  }, [])

  const onLoadServices = React.useCallback(
    async (search?: string, status?: ServiceStatus): Promise<LoadServicesResult> => {
      try {
        setLoading(true)
        setError('')
        const servicesResult = await loadServices.load({ search: search?.toLowerCase(), status })
        return servicesResult
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
      return { success: false } as LoadServicesResult
    },
    [],
  )

  React.useEffect(() => { onInit() }, [onInit])

  return (
    <PageContainer title="Serviços" subtitle="Cadastro de serviços e tabela de preços">
      <Alert
        severity="info"
        variant="outlined"
        sx={{ lineHeight: 1, mb: 1, mx: 2, px: { xs: 1, sm: 3 }, py: 0, alignItems: 'center' }}
      >
        somente serviços ativos serão exibidos no app do cliente
      </Alert>

      <ServiceFilters loadServices={onLoadServices} />

      <ServiceList onReload={onInit} />

      <ServiceFormAction />
    </PageContainer>
  )
}

export default ServicesListPage
