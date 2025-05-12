import React from 'react'
import { Icon, Stack, Typography, useTheme } from '@mui/material'
import { ServiceStatus } from '@/domain/models'

type StatusUserProps = {
  status: ServiceStatus
}

export const StatusUser: React.FC<StatusUserProps> = (props) => {
  const theme = useTheme()

  const labelStatus = {
    actived: 'ativo',
    deactivated: 'inativo',
    all: 'cancelado',
  }[props.status]

  const colorStatus = {
    actived: `${theme.palette.success.light}99`,
    deactivated: `${theme.palette.error.light}99`,
    all: `${theme.palette.error.light}99`,
  }[props.status]

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Icon sx={{ fontSize: 10, color: colorStatus,  }}>
        circle
      </Icon>
      <Typography variant='caption' fontSize={11} sx={{ ml: 0.5, color: colorStatus }}>
        {labelStatus}
      </Typography>
    </Stack>
  )
}
