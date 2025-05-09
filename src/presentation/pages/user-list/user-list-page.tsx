import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { LoadUsersParams, LoadUsersResult } from '@/domain/usecases'
import { PageContainer } from '@/presentation/components'
import { UsersFilters, UserList, Totalizers, UserFormAction } from '@/presentation/pages/user-list/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/user-list/components/atoms'

const UsersListPage: React.FC = () => {
  const setListState = useSetRecoilState(State.listState)
  const setUsers = useSetRecoilState(State.List.usersResultState)
  const setSearch = useSetRecoilState(State.List.textSearchState)
  const limit = useRecoilValue(State.List.limitState)

  const loadUsers = React.useMemo(() => Factories.makeRemoteLoadUsers(), [])

  const onInit = React.useCallback(async () => {
    setSearch('')
    const usersResult = (await onLoadUsers({ search: '', limit }))!
    if (usersResult?.success) {
      if (usersResult.data) {
        setUsers(usersResult)
      }
      return
    }

    setListState( currentState => ({ ...currentState, error: usersResult?.error || 'Erro ao carregar clientes' }))
  }, [])

  const onLoadUsers = React.useCallback(
    async (params: LoadUsersParams): Promise<LoadUsersResult> => {
      try {
        const usersResult = await loadUsers.load(params)
        return usersResult
      } catch (error) {
        setListState({ loading: true, error: (error as Error).message, noResults: false })
      } finally {
        setListState({ loading: false, noResults: false, error: '' })
      }
      return { success: false } as LoadUsersResult
    },
    [],
  )

  React.useEffect(() => { onInit() }, [])

  return (
    <PageContainer
      title="Clientes"
      subtitle="Visualizar cadastro de clientes e barbeiros"
    >
      <Totalizers />

      <UsersFilters loadUsers={onLoadUsers} />

      <UserList loadUsers={onLoadUsers}/>

      <UserFormAction />
    </PageContainer>
  )
}

export default UsersListPage
