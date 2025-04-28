import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Icon, IconButton, Stack, Tooltip } from '@mui/material'

export const AttendanceActions: React.FC = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="flex-end">
      {/* <Tooltip title="Adicionar na fila" placement="left" arrow>
        <IconButton
          size={'small'}
          sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}10` }}
          edge="end"
          aria-label="adicioanr na fila"
        >
          <Icon fontSize="small">notifications_active</Icon>
        </IconButton>
      </Tooltip> */}
      <Tooltip title="Chamar o WhatsApp" placement="left" arrow>
        <IconButton
          size={'small'}
          sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}10` }}
          edge="end"
          aria-label="whastapp"
        >
          <WhatsAppIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Adicionar na fila" placement="left" arrow>
        <IconButton
          size={'small'}
          sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}10` }}
          edge="end"
          aria-label="adicioanr na fila"
        >
          <Icon fontSize="small">more_vert</Icon>
        </IconButton>
      </Tooltip>
    </Stack>
  )
}
