import React, { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { Alert, Fab, Grid2, Icon, Stack, Zoom } from '@mui/material'
import { CreateService, LoadServices, RemoveService, UpdateService } from '@/domain/usecases'
import { PageContainer, PageTitle } from '@/presentation/components'
import { ServiceList, CreateUpdateServiceForm } from '@/presentation/pages/services/components'
import * as State from '@/presentation/pages/services/components/atoms'
import servicesHeaderImg from '@/presentation/assets/services-header.png'

type ServicesPageProps = {
  getServices: LoadServices
  updateService: UpdateService
  createService: CreateService
  removeService: RemoveService
}

const ServicesPage: React.FC<ServicesPageProps> = (props) => {
  const setOpen = useSetRecoilState(State.isOpenFormServiceState)
  const setLoading = useSetRecoilState(State.isLoadingState)
  const setServices = useSetRecoilState(State.servicesState)
  const setError = useSetRecoilState(State.errorServicesState)

  const loadServices = useCallback(() => {
    setLoading(true)
    props.getServices
      .load()
      .then(setServices)
      .catch((error) => {
        setError(error.message)
        console.error(error)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    loadServices()
  }, [])

  return (
    <PageContainer>
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

      <ServiceList loadServices={loadServices} />

      <Stack direction="row" justifyContent="center">
        <Zoom in>
          <Fab
            onClick={() => {
              setOpen(true)
            }}
            sx={{
              position: 'fixed',
              bottom: '16px',
              opacity: 0.8,
              transition: 'opacity 0.3s',
              ':hover': { opacity: 1 },
              ':active': { opacity: 1 },
            }}
          >
            <Icon sx={{ fontSize: 36, color: 'primary.dark' }}>add</Icon>
          </Fab>
        </Zoom>
      </Stack>

      <CreateUpdateServiceForm
        createService={props.createService}
        updateService={props.updateService}
        removeService={props.removeService}
      />
    </PageContainer>
  )
}

export default ServicesPage
