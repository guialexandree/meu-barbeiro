import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Chip, Icon, Slide, Stack, Typography } from '@mui/material'
import { LoadUsersResult } from '@/domain/usecases'
import { InputSearch } from '@/presentation/components'
import { State } from '@/presentation/pages/user-list/components/atoms'

type UsersFiltersProps = {
  loadUsers: (search?: string) => Promise<LoadUsersResult>
}

export const UsersFilters: React.FC<UsersFiltersProps> = (props) => {
  const setListState = useSetRecoilState(State.listState)
  const setTextSearch = useSetRecoilState(State.List.textSearchState)
  const [usersResult, setUsersResult] = useRecoilState(State.List.usersResultState)
  const [search, setSearch] = React.useState('')

  const handleLoadUsers = React.useCallback(async (textSearch: string): Promise<void> => {
    setSearch(textSearch)
    const usersResult = await props.loadUsers(textSearch)!
    if (usersResult?.success) {
      if (usersResult.data) {
        setUsersResult(usersResult)
      }

      return
    }

    setListState((currentState) => ({ ...currentState, error: usersResult?.error || 'Erro ao carregar clientes' }))
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
        showFilters={false}
        onReset={resetSearch}
      />

      {!!search && (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Slide direction="right" in mountOnEnter unmountOnExit>
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
          </Slide>

          {!!usersResult?.data?.length && (
            <Slide direction="left" in mountOnEnter unmountOnExit>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="caption" fontWeight={600} color='textSecondary'>
                  {usersResult.data.length} resultado{usersResult?.data?.length > 1 ? 's' : ''} encontrado
                  {usersResult?.data?.length > 1 ? 's' : ''}
                </Typography>
                <Icon color="secondary">search</Icon>
              </Stack>
            </Slide>
          )}
        </Stack>
      )}
    </Stack>
  )
}
