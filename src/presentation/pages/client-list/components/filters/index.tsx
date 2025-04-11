import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Stack } from '@mui/material'
import { LoadClientsResult } from '@/domain/usecases'
import { InputSearch } from '@/presentation/components'
import { State } from '@/presentation/pages/client-list/components/atoms'

type ClientFiltersProps = {
  loadClients: (search?: string) => Promise<LoadClientsResult>
}

export const ClientFilters: React.FC<ClientFiltersProps> = (props) => {
  const [clientsResult, setClientsResult] = useRecoilState(State.List.clientsResultState)
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
    <Stack spacing={1} px={2} my={1} sx={{ transition: 'height 0.3s ease' }}>
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
