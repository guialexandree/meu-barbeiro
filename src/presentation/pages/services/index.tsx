import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { Alert, Fab, Icon, Stack, Zoom } from '@mui/material'
import { GetServices, UpdateService } from '@/domain/usecases'
import { PageContainer } from '@/presentation/components'
import {
  CreateServiceForm,
  ServiceList,
  UpdateServiceForm,
} from '@/presentation/pages/services/components'
import * as State from '@/presentation/pages/services/components/atoms'

type ServicesPageProps = {
  getServices: GetServices
  updateService: UpdateService
}

const ServicesPage: React.FC<ServicesPageProps> = (props) => {
  const setOpen = useSetRecoilState(State.isOpenState)
  const setLoading = useSetRecoilState(State.isLoadingState)
  const setServices = useSetRecoilState(State.servicesState)

  useEffect(() => {
    setLoading(true)
    props.getServices
      .get()
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageContainer>
      <Alert severity="info" variant='outlined' sx={{ mb: 1, mx: 2, alignItems: 'center' }}>
        Somente serviços ativos serão exibidos para o cliente no app{' '}
        <Icon sx={{ fontSize: 12 }}>phone_iphone</Icon>
      </Alert>

      <ServiceList />

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

      <CreateServiceForm />
      <UpdateServiceForm updateService={props.updateService} />
    </PageContainer>
  )
}

export default ServicesPage
