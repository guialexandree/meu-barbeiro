import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Alert, Grid2 } from '@mui/material'
import { InputSearch, PageContainer, PageTitle } from '@/presentation/components'
import { ServiceList, AddButtonServiceForm } from '@/presentation/pages/services/components'
import * as State from '@/presentation/pages/services/components/atoms'
import * as Factories from '@/main/factories/usecases'
import servicesHeaderImg from '@/presentation/assets/services-header.png'

const ServicesPage: React.FC = () => {
  const setLoading = useSetRecoilState(State.loadingServicesState)
  const setServices = useSetRecoilState(State.servicesState)
  const setError = useSetRecoilState(State.errorServicesState)
  const setEmpty = useSetRecoilState(State.emptyServicesState)
  const loadServices = React.useMemo(() => Factories.makeRemoteLoadServices(), [])

  const handleLoadServices = React.useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      setError('')
      setEmpty(false)
      const services = await loadServices.load()
      if (services.success) {
        if (services.data.length) {
          setServices(services.data)
        } else {
          setEmpty(true)
        }
        return
      }

      setError(services.error)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <PageContainer loadPage={handleLoadServices}>
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

      <InputSearch id="services-input-search" placeholder="Buscar por serviço" valueState={State.servicesSearchState} />
      <ServiceList loadServices={handleLoadServices} />

      <AddButtonServiceForm />
    </PageContainer>
  )
}

export default ServicesPage
