import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Alert, Grid2 } from '@mui/material'
import { PageContainer, PageTitle } from '@/presentation/components'
import { ServiceList, AddButtonServiceForm, InputSearchServices } from '@/presentation/pages/services/components'
import { ServiceStatus } from '@/domain/models'
import * as State from '@/presentation/pages/services/components/atoms'
import * as Factories from '@/main/factories/usecases'
import servicesHeaderImg from '@/presentation/assets/services-header.png'
import { LoadServicesResult } from '@/domain/usecases'

const ServicesPage: React.FC = () => {
  const setLoading = useSetRecoilState(State.loadingServicesState)
  const setServices = useSetRecoilState(State.servicesState)
  const setError = useSetRecoilState(State.errorServicesState)
  const setEmpty = useSetRecoilState(State.emptyServicesState)
  const setSearch = useSetRecoilState(State.servicesSearchState)
  const loadServices = React.useMemo(() => Factories.makeRemoteLoadServices(), [])

  const onInit = React.useCallback(async () => {
    setSearch('')
    const serviceResult = (await onLoadServices())!
    if (serviceResult.success) {
      if (serviceResult.data.length) {
        setServices(serviceResult.data)
      } else {
        setEmpty(true)
      }
      return
    }

    setError(serviceResult.error)
  }, [])

  const onLoadServices = React.useCallback(async (search?: string, status?: ServiceStatus): Promise<LoadServicesResult> => {
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
    return null as unknown as LoadServicesResult
  }, [])

  return (
    <PageContainer onInit={onInit}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <PageTitle title="Serviços" subtitle="Cadastro de serviços e tabela de preços" icon={servicesHeaderImg} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Alert
            severity="info"
            variant="outlined"
            sx={{ lineHeight: 1, mb: 1, mx: 2, px: { xs: 1, sm: 3 }, py: 0, alignItems: 'center' }}
          >
            Somente serviços ativos serão exibidos para o cliente no app
          </Alert>
        </Grid2>
      </Grid2>

      <InputSearchServices loadServices={onLoadServices} />

      <ServiceList onReload={onInit} />

      <AddButtonServiceForm />
    </PageContainer>
  )
}

export default ServicesPage
