import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { DataGrid } from '@mui/x-data-grid'
import { Stack } from '@mui/material'
import { GetClients } from '@/domain/usecases'
import { InputSearch } from '@/presentation/components'
import { listClientsColumns } from './schema'
import * as State from '@/presentation/pages/clients/components/atoms'

type ClientListProps = {
  getClients: GetClients
}

export const ClientList: React.FC<ClientListProps> = (props) => {
  const clients = useRecoilValue(State.clientsSearchedState)
  const setClients = useSetRecoilState(State.clientsState)

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    await props.getClients
      .get()
      .then(setClients)
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {})
  }

  return (
    <Stack sx={{ height: 436 }}>
      <InputSearch id="clients-search" placeholder="Buscar por cliente" valueState={State.textClientsSearchState} />

      <DataGrid
        density="compact"
        rows={clients}
        columns={listClientsColumns}
        pageSizeOptions={[8]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        sx={{
          border: 0,
          px: 2,
          '& .MuiDataGrid-columnHeaders': {
            display: 'none',
          },
          height: 120,
        }}
        disableColumnResize
        disableColumnMenu
        disableColumnSelector
        columnVisibilityModel={{ id: false }}
      />
    </Stack>
  )
}
