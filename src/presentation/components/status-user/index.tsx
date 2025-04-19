import React from 'react'
import { Icon, Stack, Typography } from '@mui/material'

type StatusUserProps = {
  status: 'actived' | 'deactivated'
}

export const StatusUser: React.FC<StatusUserProps> = (props) => {
  const labelStatus = {
    actived: 'ativo',
    deactivated: 'inativo',
  }[props.status]

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Icon color={props.status === 'actived' ? 'success' : 'error'} sx={{ fontSize: 10 }}>
        circle
      </Icon>
      <Typography variant='caption' fontSize={11} color={props.status === 'actived' ? 'success.main' : 'error.main'} sx={{ ml: 0.5 }}>
        {labelStatus}
      </Typography>
    </Stack>
  )
}
