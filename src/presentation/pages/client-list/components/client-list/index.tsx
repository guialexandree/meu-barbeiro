import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Box, Button, Fade, List, Stack, Typography } from '@mui/material'
import { PageLoader } from '@/presentation/components'
import { State } from '@/presentation/pages/client-list/components/atoms'
import emptyListImg from '@/presentation/assets/empty-list.svg'
import errorListImg from '@/presentation/assets/error-list.svg'
import { ClientItem } from '../client-item'

type ClientListProps = {
  onReload: VoidFunction
}

export const ClientList: React.FC<ClientListProps> = (props) => {
  const [error, setError] = useRecoilState(State.errorClientsState)
  const clientsResult = useRecoilValue(State.List.clientsResultState)
  const noResults = useRecoilValue(State.noResultsClientsState)
  const loading = useRecoilValue(State.loadingClientsState)
  const search = useRecoilValue(State.List.textSearchState)

  if (loading) {
    return <PageLoader />
  }

  if (error) {
    return (
      <Stack id="error-list" sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} alignItems="center" spacing={1}>
        <Box component="img" src={errorListImg} alt="Erro ao carregar clientes" width={180} height={180} />
        <Typography variant="h6" align="center">
          Erro ao carregar clientes
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          id="reload-clients"
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

  if (noResults) {
    return (
      <Stack
        id="no-results-client-list"
        sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }}
        px={2}
        alignItems="center"
        spacing={1}
      >
        <Box component="img" src={emptyListImg} alt="Nenhum cliente cadastrado" width={160} height={160} />
        <Typography variant="h6" align="center">
          {`Nenhum cliente foi encontrado com o filtro ${search?.toLocaleUpperCase()}`}
        </Typography>
        <Button id="empty-action-service-list" variant="outlined" color="primary">
          remover filtros
        </Button>
      </Stack>
    )
  }

  return (
    <Box mx={2}>
      <List dense disablePadding id="client-list" sx={{ maxWidth: 'calc(100vw - 32px)' }}>
        {clientsResult?.data?.map((client, index) => (
          <Fade in timeout={700} style={{ transitionDelay: `${index * 100}ms` }} key={client.id}>
            <Box component="section">
              <ClientItem client={client} />
            </Box>
          </Fade>
        ))}
      </List>
    </Box>
  )
}
