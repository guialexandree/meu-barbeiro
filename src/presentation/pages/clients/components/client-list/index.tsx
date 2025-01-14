import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { _mockClients } from '@/domain/tests'
import { Icon, IconButton, Stack } from '@mui/material'
import { InputSearch } from '@/presentation/components'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'IDs',
    width: 70,
  },
  { field: 'name', headerName: 'Nome', flex: 1, sortable: false },
  {
    field: 'edit',
    headerName: '',
    headerAlign: 'center',
    sortable: false,
    align: 'center',
    width: 90,
    renderCell: () => (
      <IconButton
        sx={{ backgroundColor: '#42424240' }}
        edge="end"
        aria-label="delete"
      >
        <Icon sx={{ color: 'grey.600' }}>edit</Icon>
      </IconButton>
    ),
  },
]

const ClientList: React.FC = () => {
  return (
    <Stack>
      <InputSearch placeholder='Buscar por cliente' />

      <DataGrid
        rows={_mockClients}
        columns={columns}
        pageSizeOptions={[5, 10]}
        sx={{
          border: 0,
          px: 2,
          '& .MuiDataGrid-columnHeaders': {
            display: 'none',
          },
        }}
        disableColumnResize
        disableColumnMenu
        columnVisibilityModel={{
          id: false,
        }}
      />
    </Stack>
  )
}

export default ClientList
