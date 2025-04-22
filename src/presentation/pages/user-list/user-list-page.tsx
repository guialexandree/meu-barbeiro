import React from 'react'
import { useSetRecoilState } from 'recoil'
import { LoadUsersResult } from '@/domain/usecases'
import { PageContainer } from '@/presentation/components'
import { UsersFilters, UserList, Totalizers, UserFormAction } from '@/presentation/pages/user-list/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/user-list/components/atoms'

const UsersListPage: React.FC = () => {
  const setListState = useSetRecoilState(State.listState)
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

    setListState( currentState => ({ ...currentState, error: usersResult?.error || 'Erro ao carregar clientes' }))
  }, [])

  const onLoadUsers = React.useCallback(
    async (search?: string): Promise<LoadUsersResult> => {
      try {
        setListState({ loading: true, error: '', noResults: false })
        const usersResult = await loadUsers.load({ page, limit, search })
        return usersResult
      } catch (error) {
        setListState({ loading: true, error: (error as Error).message, noResults: false })
      } finally {
        setListState( currentState => ({ ...currentState, loading: false }))
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
