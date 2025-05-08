import React from 'react'
import { Chip, Grow, Icon, IconButton, ListItemIcon, MenuItem, Stack, Typography } from '@mui/material'
import { AttendanceStatus } from '@/domain/models'
import { useRecoilValue } from 'recoil'
import { Menu } from '@/presentation/components'
import { GenericState } from '@/presentation/components/atoms'

type HeaderProps = {
  status: AttendanceStatus | undefined
  startDate?: string | undefined
}

export const Header: React.FC<HeaderProps> = (props) => {
  const dateAdapter = useRecoilValue(GenericState.dateAdapterState)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  if (!props.status) {
    return null
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const statusLabel = {
    in_queue: 'NA VEZ',
    current: 'NA VEZ',
    attending: 'EM ATENDIMENTO',
    finished: 'FINALIZADO',
    canceled: 'CANCELADO',
  }[props.status || 'in_queue']

  const statusColor: any = {
    in_queue: 'info',
    current: 'info',
    attending: 'success',
    finished: 'success',
    canceled: 'error',
  }[props.status || 'in_queue']

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }} spacing={1}>
      <Grow in unmountOnExit>
        <Chip
          variant="filled"
          color={statusColor}
          label={statusLabel}
          size="small"
          sx={{ fontSize: 14, fontWeight: 800, letterSpacing: 1 }}
        />
      </Grow>

      {props.startDate && (
        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={0.5} sx={{ flex: 1 }}>
          <Icon fontSize="small" sx={{ color: 'grey.500' }}>
            access_time
          </Icon>
          <Typography variant="caption" fontSize={12} fontFamily="Inter" sx={{ color: 'grey.500', fontWeight: 500 }}>
            INICIOU {dateAdapter.format(props.startDate!, 'HH:mm')}
          </Typography>
        </Stack>
      )}

      <IconButton
        size="small"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon fontSize="small">more_vert</Icon>
      </IconButton>

      <Menu
        anchorOrigin={{
          horizontal: 'left',
          vertical: 30,
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Icon sx={{ color: 'grey.900' }} fontSize="small">
              edit
            </Icon>
          </ListItemIcon>
          Editar serviços
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Icon sx={{ color: 'grey.900' }} fontSize="small">
              close
            </Icon>
          </ListItemIcon>
          Cancelar atendimento
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Icon sx={{ color: 'grey.900' }} fontSize="small">
              south
            </Icon>
          </ListItemIcon>
          Enviar para o final da fila
        </MenuItem>
      </Menu>
    </Stack>
  )
}
