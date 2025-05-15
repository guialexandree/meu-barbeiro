import React from 'react'
import { Box, Icon, Zoom } from '@mui/material'
import checkMedia from '@/presentation/assets/check.gif'
import { PanelStatusType } from '../..'

type PanelStatusProps = {
  status: PanelStatusType
}

export const PanelStatus: React.FC<PanelStatusProps> = (props) => {
  if (!props.status) {
    return null
  }

  const icon = {
    ending: (
      <Box
        sx={{ width: 80, height: 80, objectFit: 'contain' }}
        component="img"
        src={checkMedia}
        alt="icone com estado"
      />
    ),
    reentry: (
      <Zoom in>
        <Icon
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            width: 60,
            fontSize: 50,
            backgroundColor: 'primary.light',
            borderRadius: 8,
          }}
        >
          redo
        </Icon>
      </Zoom>
    ),
    cancelling: (
      <Zoom in>
        <Icon
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            width: 60,
            fontSize: 50,
            backgroundColor: 'error.light',
            borderRadius: 8,
          }}
        >
          close
        </Icon>
      </Zoom>
    ),
    default: null,
  }[props.status || 'default']

  const color = {
    ending: 'success',
    reentry: 'primary',
    cancelling: 'error',
    default: 'success',
  }[props.status || 'default'] as 'success' | 'error' | 'primary'

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundColor: (theme) => `${theme.palette[color].main}90`,
        zIndex: 1,
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        width: '100%',
      }}
    >
      {icon && <Zoom in>{icon}</Zoom>}
    </Box>
  )
}
