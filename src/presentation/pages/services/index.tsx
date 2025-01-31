import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Alert, Grid2, Icon } from '@mui/material'
import { PageContainer, PageTitle } from '@/presentation/components'
import { ServiceList, AddButtonServiceForm } from '@/presentation/pages/services/components'
import * as State from '@/presentation/pages/services/components/atoms'
import * as Factories from '@/main/factories/usecases'
import servicesHeaderImg from '@/presentation/assets/services-header.png'

const ServicesPage: React.FC = () => {
  const setServices = useSetRecoilState(State.servicesState)

  const loadServices = React.useMemo(() => Factories.makeRemoteLoadServices(), [])

  const handleLoadServices = React.useCallback(async (): Promise<void> => {
    const services = await loadServices.load()
    setServices(services)
  }, [])

  return (
    <PageContainer loadPage={handleLoadServices}>
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <PageTitle title="Serviços" subtitle="Cadastro de serviços e tabela de preços" icon={servicesHeaderImg} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Alert severity="info" variant="outlined" sx={{ mb: 1, mx: 2, px: { xs: 2, sm: 3 }, py: 0, alignItems: 'center' }}>
            Somente serviços ativos serão exibidos para o cliente no app <Icon sx={{ fontSize: 12 }}>phone_iphone</Icon>
          </Alert>
        </Grid2>
      </Grid2>

      <ServiceList loadServices={handleLoadServices} />

      <AddButtonServiceForm />

    </PageContainer>
  )
}

export default ServicesPage
