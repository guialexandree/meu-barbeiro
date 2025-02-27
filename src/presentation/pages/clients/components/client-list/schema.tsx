import { GridColDef } from '@mui/x-data-grid'
import { Avatar, Icon, IconButton } from '@mui/material'
import avataaars1 from '@/presentation/assets/avatars/avataaars1.svg'

export const listClientsColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'IDs',
    width: 70,
  },
  {
    field: 'imgSrc',
    headerName: '',
    width: 24,
    sortable: false,
    renderCell: () => (
      <Avatar
        src={avataaars1}
        sx={{ width: 32, height: 32 }}
      />
    ),
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
        size="small"
        aria-label="delete"
      >
        <Icon sx={{ color: 'grey.600', fontSize: { xs: 16, sm: 20 } }}>
          edit
        </Icon>
      </IconButton>
    ),
  },
]
