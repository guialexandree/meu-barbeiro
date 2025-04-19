import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Stack } from '@mui/material'
import { LoadUsersResult } from '@/domain/usecases'
import { InputSearch } from '@/presentation/components'
import { State } from '@/presentation/pages/user-list/components/atoms'

type UsersFiltersProps = {
  loadUsers: (search?: string) => Promise<LoadUsersResult>
}

export const UsersFilters: React.FC<UsersFiltersProps> = (props) => {
  const setUsers = useSetRecoilState(State.List.usersResultState)
  const setError = useSetRecoilState(State.errorClientsState)

  const handleLoadUsers = React.useCallback(async (textSearch: string): Promise<void> => {
    const usersResult = await props.loadUsers(textSearch)!
    if (usersResult?.success) {
      if (usersResult.data) {
        setUsers(usersResult)
      }

      return
    }

    setError(usersResult?.error || 'Erro ao carregar clientes')
  }, [])

  return (
    <Stack spacing={1} px={2} sx={{ transition: 'height 0.3s ease' }}>
      <InputSearch
        id="clients-input-search"
        placeholder="Buscar"
        loadData={handleLoadUsers}
        inputSearchState={State.List.textSearchState}
        showFiltersState={State.List.showFilterState}
      />
    </Stack>
  )
}
