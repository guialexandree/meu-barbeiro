import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Icon, IconButton, Stack, Tooltip } from '@mui/material'

type AttendanceActionsProps = {
  openDialogWhatsapp: VoidFunction
}

export const AttendanceActions: React.FC<AttendanceActionsProps> = (props) => {
  return (
    <Stack direction="row" spacing={1} alignItems="flex-end">
      <Tooltip title="Chamar o WhatsApp" placement="left" arrow>
        <IconButton
          size={'small'}
          sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}10` }}
          edge="end"
          aria-label="whastapp"
          onClick={props.openDialogWhatsapp}
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
