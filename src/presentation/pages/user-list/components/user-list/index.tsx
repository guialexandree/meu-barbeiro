import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Chip, Fade, Icon, Stack } from '@mui/material'
import { LoadUsersParams, LoadUsersResult } from '@/domain/usecases'
import { List } from '@/presentation/components'
import { State } from '@/presentation/pages/user-list/components/atoms'
import { UserItem } from '../user-item'

type UserListProps = {
  loadUsers: (params: LoadUsersParams) => Promise<LoadUsersResult>
}

const TOTAL_USERS_LOAD = 10

export const UserList: React.FC<UserListProps> = (props) => {
  const usersTotalizer = useRecoilValue(State.List.usersTotalizerResultState)
  const search = useRecoilValue(State.List.textSearchState)
  const [usersResult, setUsersResult] = useRecoilState(State.List.usersResultState)
  const [limit, setLimit] = useRecoilState(State.List.limitState)

  const loadMore = React.useCallback(async () => {
    const newLimit = limit + TOTAL_USERS_LOAD

    const usersResult = await props.loadUsers({
      search,
      page: 1,
      limit: newLimit,
    })
    setUsersResult(usersResult)
    setLimit(newLimit)
  }, [limit])

  const refreshList = React.useCallback(async () => {
    const newLimit = 10

    const usersResult = await props.loadUsers({
      search,
      page: 1,
      limit: newLimit,
    })
    setUsersResult(usersResult)
    setLimit(newLimit)
  }, [search])

  const handleReload = React.useCallback(async () => {
    props.loadUsers({ search, limit })
  }, [search, limit])

  return (
    <List
      id="user-list"
      onReload={handleReload}
      listState={State.listState}
      messagesStates={{
        noResults: `Nenhum cliente foi encontrado com o filtro ${search?.toLocaleUpperCase()}`,
        error: 'Erro ao carregar clientes',
      }}
    >
      <InfiniteScroll
        dataLength={usersResult?.data?.length || 0}
        next={loadMore}
        hasMore={(usersResult?.data?.length || 0) < (usersTotalizer?.data?.total || 0)}
        loader={
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%', p: 2 }}>
            <Chip
              sx={{ backgroundColor: 'background.paper' }}
              variant="filled"
              label="Buscando clientes..."
              size="small"
            />
          </Stack>
        }
        endMessage={
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%', p: 2 }}>
            <Chip
              sx={{ backgroundColor: 'background.paper' }}
              variant="filled"
              label={`Total de ${usersResult?.data?.length} clientes`}
              size="small"
            />
          </Stack>
        }
        style={{ minHeight: '30vh' }}
        refreshFunction={refreshList}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%', p: 2 }}>
            <Chip
              color="default"
              icon={<Icon sx={{ mr: 1 }}>south</Icon>}
              sx={{ backgroundColor: 'background.paper' }}
              variant="filled"
              label="Arraste para baixo para atualizar"
              size="small"
            />
          </Stack>
        }
        releaseToRefreshContent={
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%', p: 2 }}>
            <Chip
              sx={{ backgroundColor: 'background.paper' }}
              variant="filled"
              label="Atualizando clientes..."
              size="small"
            />
          </Stack>
        }
      >
        {usersResult?.data?.map((client, index) => (
          <Fade in timeout={700} style={{ transitionDelay: `${index * 100}ms` }} key={client.id}>
            <span>
              <UserItem user={client} />
            </span>
          </Fade>
        ))}
      </InfiniteScroll>
    </List>
  )
}
