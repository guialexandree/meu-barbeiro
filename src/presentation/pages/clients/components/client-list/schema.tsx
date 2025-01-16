import { GridColDef } from '@mui/x-data-grid'
import { Icon, IconButton } from '@mui/material'

export const listClientsColumns: GridColDef[] = [
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
    width: 60,
    renderCell: () => (
      <IconButton
        sx={{ backgroundColor: '#42424240' }}
        edge="end"
        size='small'
        aria-label="delete"
      >
        <Icon sx={{ color: 'grey.600', fontSize: { xs: 16, sm: 20 } }}>edit</Icon>
      </IconButton>
    ),
  },
]
