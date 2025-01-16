import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Stack } from '@mui/material'
import { InputSearch } from '@/presentation/components'
import { listClientsColumns } from './schema'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as State from '@/presentation/pages/clients/components/atoms'

const ClientList: React.FC = () => {
  const clients = useRecoilValue(State.clientsSearchedState)
  const [textClientsSearch, setTextSearch] = useRecoilState(State.textClientsSearchState)

  return (
    <Stack sx={{ height: 436 }}>
      <InputSearch
        placeholder="Buscar por cliente"
        value={textClientsSearch}
        onChange={setTextSearch}
      />

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

export default ClientList
