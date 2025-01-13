import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { _mockClients } from '@/domain/tests'
import { Icon, IconButton } from '@mui/material'

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
    <DataGrid
      rows={_mockClients}
      columns={columns}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0, px: 2 }}
      disableColumnResize
      disableColumnMenu
      columnVisibilityModel={{
        id: false,
      }}
    />
  )
}

export default ClientList
