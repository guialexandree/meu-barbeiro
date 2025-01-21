import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Backdrop, Box, Button, CircularProgress, Fade, List, Stack, Typography } from '@mui/material'
import { ServiceListItem } from '@/presentation/pages/services/components'
import * as State from '@/presentation/pages/services/components/atoms'
import emptyListImg from '@/presentation/assets/empty-list.svg'
import errorListImg from '@/presentation/assets/error-list.svg'

type ServiceListProps = {
  loadServices: VoidFunction
}

export const ServiceList: React.FC<ServiceListProps> = (props) => {
  const [error, setError] = useRecoilState(State.errorServicesState)
  const services = useRecoilValue(State.servicesState)
  const loading = useRecoilValue(State.isLoadingState)
  const loadingUpdate = useRecoilValue(State.isLoadingCreateUpdateState)

  if (error) {
    return (
      <Stack sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} alignItems="center" spacing={1}>
        <Box component="img" src={errorListImg} alt="Erro ao carregar serviços" width={180} height={180} />
        <Typography variant="h6" align="center">
          Erro ao carregar serviços
        </Typography>
        <Button variant="outlined" color="primary" onClick={() => {
          setError('')
          props.loadServices()
          }}>
          tentar novamente
        </Button>
      </Stack>
    )
  }

  if (loading || loadingUpdate) {
    return (
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  if (!services.length) {
    return (
      <Stack sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} alignItems="center" spacing={1}>
        <Box component="img" src={emptyListImg} alt="Nenhum serviço cadastrado" width={160} height={160} />
        <Typography variant="h6" align="center">
          Nenhum serviço cadastrado
        </Typography>
        <Button variant="outlined" color="primary">
          criar novo
        </Button>
      </Stack>
    )
  }

  return (
    <Fade in timeout={700}>
      <Box sx={{ mx: 2 }}>
        <List disablePadding sx={{}}>
          {services.map((service) => (
            <ServiceListItem key={service.id} service={service} />
          ))}
        </List>
      </Box>
    </Fade>
  )
}
