import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Box, Button, Fade, List, Stack, Typography } from '@mui/material'
import { ServiceListItem } from '@/presentation/pages/services/components'
import { PageLoader } from '@/presentation/components'
import { State } from '@/presentation/pages/services/components/atoms'
import emptyListImg from '@/presentation/assets/empty-list.svg'
import errorListImg from '@/presentation/assets/error-list.svg'

type ServiceListProps = {
  onReload: VoidFunction
}

export const ServiceList: React.FC<ServiceListProps> = (props) => {
  const [error, setError] = useRecoilState(State.errorServicesState)
  const empty = useRecoilValue(State.emptyServicesState)
  const services = useRecoilValue(State.List.servicesState)
  const noResults = useRecoilValue(State.noResultsServicesState)
  const loading = useRecoilValue(State.loadingServicesState)
  const search = useRecoilValue(State.List.servicesSearchState)

  if (loading) {
    return (
      <PageLoader />
    )
  }

  if (error) {
    return (
      <Stack id="error-list" sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} alignItems="center" spacing={1}>
        <Box component="img" src={errorListImg} alt="Erro ao carregar serviços" width={180} height={180} />
        <Typography variant="h6" align="center">
          Erro ao carregar serviços
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          id="reload-services"
          onClick={() => {
            setError('')
            props.onReload()
          }}
        >
          tentar novamente
        </Button>
      </Stack>
    )
  }

  if (empty) {
    return (
      <Stack id="empty-services-list" sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} alignItems="center" spacing={1}>
        <Box component="img" src={emptyListImg} alt="Nenhum serviço cadastrado" width={160} height={160} />
        <Typography variant="h6" align="center">
          Nenhum serviço cadastrado
        </Typography>
        <Button id="empty-action-services-list" variant="outlined" color="primary">
          criar novo
        </Button>
      </Stack>
    )
  }

  if (noResults) {
    return (
      <Stack id="no-results-services-list" sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} px={2} alignItems="center" spacing={1}>
        <Box component="img" src={emptyListImg} alt="Nenhum serviço cadastrado" width={160} height={160} />
        <Typography variant="h6" align="center">
          {`Nenhum serviço foi encontrado com o filtros ${search?.toLocaleUpperCase()}`}
        </Typography>
        <Button id="empty-action-services-list" variant="outlined" color="primary">
          remover filtros
        </Button>
      </Stack>
    )
  }

  return (
    <Fade in timeout={700}>
      <Box>
        <List dense disablePadding id='services-list'>
          {services.map((service) => (
            <ServiceListItem key={service.id} service={service} />
          ))}
        </List>
      </Box>
    </Fade>
  )
}
