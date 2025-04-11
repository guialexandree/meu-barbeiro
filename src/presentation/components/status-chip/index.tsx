import React from 'react'
import { Chip, Icon } from '@mui/material'

type StatusChipProps = {
  status: 'actived' | 'deactivated'
}

export const StatusChip: React.FC<StatusChipProps> = (props) => {
  const labelStatus = {
    actived: 'ativo',
    deactivated: 'inativo',
  }[props.status]

  return (
    <Chip
      variant="outlined"
      icon={
        <Icon color={props.status === 'actived' ? 'success' : 'error'} sx={{ fontSize: 10 }}>
          circle
        </Icon>
      }
      label={labelStatus}
      color={props.status === 'actived' ? 'success' : 'error'}
      sx={{
        px: 0.5,
        borderRadius: 1,
        borderColor: 'grey.800',
        backgroundColor: theme => `${theme.palette[props.status === 'actived' ? 'success' : 'error'].main}12`,
        height: 24,
        fontSize: 13,
      }}
    />
  )
}
