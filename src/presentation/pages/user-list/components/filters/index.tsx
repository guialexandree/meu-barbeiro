import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Stack } from '@mui/material'
import { LoadUsersResult } from '@/domain/usecases'
import { InputSearch } from '@/presentation/components'
import { State } from '@/presentation/pages/user-list/components/atoms'

type UsersFiltersProps = {
  loadClients: (search?: string) => Promise<LoadUsersResult>
}

export const UsersFilters: React.FC<UsersFiltersProps> = (props) => {
  const [clientsResult, setClientsResult] = useRecoilState(State.List.usersResultState)
  const search = useRecoilValue(State.List.textSearchState)
  const setNoResut = useSetRecoilState(State.noResultsClientsState)

  React.useEffect(() => {
    if (search && !clientsResult?.data?.length) {
      setNoResut(true)
    } else {
      setNoResut(false)
    }
  }, [search, clientsResult])

  const handleLoadClients = React.useCallback(async (textSearch: string): Promise<void> => {
    const services = await props.loadClients(textSearch)!
    if (services?.success) {
      setClientsResult(clientsResult)
      return
    }
  }, [])

  return (
    <Stack spacing={1} px={2} sx={{ transition: 'height 0.3s ease' }}>
      <InputSearch
        id="clients-input-search"
        placeholder="Buscar"
        loadData={handleLoadClients}
        inputSearchState={State.List.textSearchState}
        showFiltersState={State.List.showFilterState}
      />
    </Stack>
  )
}
