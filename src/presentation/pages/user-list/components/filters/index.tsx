import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Chip, Icon, IconButton, Slide, Stack, Typography } from '@mui/material'
import { LoadUsersParams, LoadUsersResult } from '@/domain/usecases'
import { InputSearch } from '@/presentation/components'
import { State } from '@/presentation/pages/user-list/components/atoms'

type UsersFiltersProps = {
  loadUsers: (params: LoadUsersParams) => Promise<LoadUsersResult>
}

export const UsersFilters: React.FC<UsersFiltersProps> = (props) => {
  const navigate = useNavigate()
  const setListState = useSetRecoilState(State.listState)
  const setTextSearch = useSetRecoilState(State.List.textSearchState)
  const [usersResult, setUsersResult] = useRecoilState(State.List.usersResultState)
  const [search, setSearch] = React.useState('')

  const handleLoadUsers = React.useCallback(async (params: LoadUsersParams): Promise<void> => {
    setSearch(search)
    const usersResult = await props.loadUsers(params)!
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
    handleLoadUsers({ search: '', limit: 10 })
  }, [])

  return (
    <Stack spacing={1} px={2} sx={{ transition: 'height 0.3s ease' }}>
      <Stack direction="row" alignItems="center">
        <InputSearch
          id="clients-input-search"
          placeholder="Buscar"
          loadData={(search) => {
            handleLoadUsers({ search, limit: 20 })
          }}
          inputSearchState={State.List.textSearchState}
          showFiltersState={State.List.showFilterState}
          showFilters={false}
          onReset={resetSearch}
        />
        <IconButton
          onClick={() => {
            navigate('/clientes/criar-novo')
          }}
          sx={{
            width: 48,
            height: 48,
            ml: 1,
            backgroundColor: 'primary.main',
            boxShadow: 'none',
            color: 'primary.light',
            borderRadius: 2,
          }}
        >
          <Icon sx={{ color: 'text.secondary' }}>person_add</Icon>
        </IconButton>
      </Stack>

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
                <Typography variant="caption" fontWeight={600} color="textSecondary">
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
