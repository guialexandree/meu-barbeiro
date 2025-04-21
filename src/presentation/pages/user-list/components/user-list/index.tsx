import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Box, Button, Fade, List, Stack, Typography } from '@mui/material'
import { PageLoader } from '@/presentation/components'
import { State } from '@/presentation/pages/user-list/components/atoms'
import emptyListImg from '@/presentation/assets/empty-list.svg'
import errorListImg from '@/presentation/assets/error-list.svg'
import { UserItem } from '../user-item'

type UserListProps = {
  onReload: VoidFunction
}

export const UserList: React.FC<UserListProps> = (props) => {
  const [error, setError] = useRecoilState(State.errorClientsState)
  const clientsResult = useRecoilValue(State.List.usersResultState)
  const noResults = useRecoilValue(State.noResultsClientsState)
  const loading = useRecoilValue(State.loadingUsersState)
  const search = useRecoilValue(State.List.textSearchState)

  if (loading) {
    return <PageLoader loading />
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
          id="reload-users"
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
        id="no-results-list"
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
      <List dense disablePadding id="user-list">
        {clientsResult?.data?.map((client, index) => (
          <Fade in timeout={700} style={{ transitionDelay: `${index * 100}ms` }} key={client.id}>
            <span>
              <UserItem user={client} />
            </span>
          </Fade>
        ))}
      </List>
    </Box>
  )
}
