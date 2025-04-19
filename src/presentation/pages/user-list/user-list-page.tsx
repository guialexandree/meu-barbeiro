import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Fab, Icon, Stack, Zoom } from '@mui/material'
import { LoadUsersResult } from '@/domain/usecases'
import { PageContainer } from '@/presentation/components'
import { UsersFilters, UserList, Totalizers } from '@/presentation/pages/user-list/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/user-list/components/atoms'

const UsersListPage: React.FC = () => {
  const navigate = useNavigate()
  const setLoading = useSetRecoilState(State.loadingClientsState)
  const setError = useSetRecoilState(State.errorClientsState)
  const setUsers = useSetRecoilState(State.List.usersResultState)
  const setSearch = useSetRecoilState(State.List.textSearchState)
  const [page] = React.useState(1)
  const [limit] = React.useState(10)

  const loadClients = React.useMemo(() => Factories.makeRemoteLoadUsers(), [])

  const onInit = React.useCallback(async () => {
    setSearch('')
    const clientResult = (await onLoadClients())!
    if (clientResult?.success) {
      if (clientResult.data.length) {
        setUsers(clientResult)
      }

      return
    }

    setError(clientResult?.error || 'Erro ao carregar clientes')
  }, [])

  const onLoadClients = React.useCallback(
    async (search?: string): Promise<LoadUsersResult> => {
      try {
        setLoading(true)
        setError('')
        const clientsResult = await loadClients.load({ page, limit, search })
        return clientsResult
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
      return { success: false } as LoadUsersResult
    },
    [],
  )

  React.useEffect(() => { onInit()}, [])

  return (
    <PageContainer
      title="Clientes"
      subtitle="Visualizar cadastro de clientes e barbeiros"
    >
      <Totalizers />

      <UsersFilters loadUsers={onLoadClients} />

      <UserList onReload={onLoadClients}/>

      <Stack direction="row" justifyContent="center">
        <Zoom in>
          <Fab
            onClick={() => { navigate('/clientes/criar-novo') }}
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
    </PageContainer>
  )
}

export default UsersListPage
