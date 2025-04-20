import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Chip, Icon, Stack, Typography } from '@mui/material'
import { LoadUsersResult } from '@/domain/usecases'
import { InputSearch } from '@/presentation/components'
import { State } from '@/presentation/pages/user-list/components/atoms'

type UsersFiltersProps = {
  loadUsers: (search?: string) => Promise<LoadUsersResult>
}

export const UsersFilters: React.FC<UsersFiltersProps> = (props) => {
  const setUsers = useSetRecoilState(State.List.usersResultState)
  const setError = useSetRecoilState(State.errorClientsState)
  const setTextSearch = useSetRecoilState(State.List.textSearchState)
  const [search, setSearch] = React.useState('')

  const handleLoadUsers = React.useCallback(async (textSearch: string): Promise<void> => {
    setSearch(textSearch)
    const usersResult = await props.loadUsers(textSearch)!
    if (usersResult?.success) {
      if (usersResult.data) {
        setUsers(usersResult)
      }

      return
    }

    setError(usersResult?.error || 'Erro ao carregar clientes')
  }, [])

  const resetSearch = React.useCallback(() => {
    setTextSearch('')
    setSearch('')
    handleLoadUsers('')
  }, [])

  return (
    <Stack spacing={1} px={2} sx={{ transition: 'height 0.3s ease' }}>
      <InputSearch
        id="clients-input-search"
        placeholder="Buscar"
        loadData={handleLoadUsers}
        inputSearchState={State.List.textSearchState}
        showFiltersState={State.List.showFilterState}
        onReset={resetSearch}
      />

      {!!search && (
        <Stack direction="row" alignItems="center">
          <Chip
            color={'secondary'}
            variant="outlined"
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="caption" fontWeight={600}>
                  FILTRO:
                </Typography>
                <Typography variant="body2" fontWeight={300}>
                  {search}
                </Typography>
              </Stack>
            }
            size="small"
            deleteIcon={<Icon color="secondary">close</Icon>}
            onDelete={resetSearch}
            sx={{ cursor: 'pointer' }}
          />
        </Stack>
      )}
    </Stack>
  )
}
