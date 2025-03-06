import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Alert } from '@mui/material'
import { PageContainer } from '@/presentation/components'
import { ServiceList, ServiceFilters } from '@/presentation/pages/services/components'
import { ServiceStatus } from '@/domain/models'
import { State } from '@/presentation/pages/services/components/atoms'
import { LoadServicesResult } from '@/domain/usecases'
import { Factories } from '@/main/factories/usecases'

const ServicesPage: React.FC = () => {
  const setLoading = useSetRecoilState(State.loadingServicesState)
  const setServices = useSetRecoilState(State.List.servicesState)
  const setError = useSetRecoilState(State.errorServicesState)
  const setEmpty = useSetRecoilState(State.emptyServicesState)
  const setSearch = useSetRecoilState(State.List.servicesSearchState)

  const loadServices = React.useMemo(() => Factories.makeRemoteLoadServices(), [])

  const onInit = React.useCallback(async () => {
    setSearch('')
    const serviceResult = (await onLoadServices())!
    if (serviceResult?.success) {
      if (serviceResult.data.length) {
        setServices(serviceResult.data)
      } else {
        setEmpty(true)
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
        setEmpty(false)
        const servicesResult = await loadServices.load({ search, status })
        return servicesResult
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
      return { success: false } as LoadServicesResult
    }, [])

  return (
    <PageContainer
      onInit={onInit}
      title="Serviços"
      subtitle="Cadastro de serviços e tabela de preços"
    >
      <Alert
        severity="info"
        variant="outlined"
        sx={{ lineHeight: 1, mb: 2, mx: 2, px: { xs: 1, sm: 3 }, py: 0, alignItems: 'center' }}
      >
        Somente serviços ativos serão exibidos para o cliente no app
      </Alert>

      <ServiceFilters loadServices={onLoadServices}/>

      <ServiceList onReload={onInit} />

    </PageContainer>
  )
}

export default ServicesPage
