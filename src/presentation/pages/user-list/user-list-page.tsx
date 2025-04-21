import React from 'react'
import { useSetRecoilState } from 'recoil'
import { LoadUsersResult } from '@/domain/usecases'
import { PageContainer } from '@/presentation/components'
import { UsersFilters, UserList, Totalizers, UserFormAction } from '@/presentation/pages/user-list/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/user-list/components/atoms'

const UsersListPage: React.FC = () => {
  const setLoading = useSetRecoilState(State.loadingUsersState)
  const setError = useSetRecoilState(State.errorClientsState)
  const setUsers = useSetRecoilState(State.List.usersResultState)
  const setSearch = useSetRecoilState(State.List.textSearchState)
  const [page] = React.useState(1)
  const [limit] = React.useState(10)

  const loadUsers = React.useMemo(() => Factories.makeRemoteLoadUsers(), [])

  const onInit = React.useCallback(async () => {
    setSearch('')
    const usersResult = (await onLoadUsers())!
    if (usersResult?.success) {
      if (usersResult.data) {
        setUsers(usersResult)
      }
      return
    }

    setError(usersResult?.error || 'Erro ao carregar clientes')
  }, [])

  const onLoadUsers = React.useCallback(
    async (search?: string): Promise<LoadUsersResult> => {
      try {
        setLoading(true)
        setError('')
        const usersResult = await loadUsers.load({ page, limit, search })
        return usersResult
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
      return { success: false } as LoadUsersResult
    },
    [],
  )

  React.useEffect(() => { onInit() }, [onInit])

  return (
    <PageContainer
      title="Clientes"
      subtitle="Visualizar cadastro de clientes e barbeiros"
    >
      <Totalizers />

      <UsersFilters loadUsers={onLoadUsers} />

      <UserList onReload={onLoadUsers}/>

      <UserFormAction />
    </PageContainer>
  )
}

export default UsersListPage
