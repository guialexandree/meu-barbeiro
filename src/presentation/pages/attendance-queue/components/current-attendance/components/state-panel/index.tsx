import React from 'react'
import { Box, Icon, Zoom } from '@mui/material'
import checkMedia from '@/presentation/assets/check.gif'

type StatePanelProps = {
  variant: 'success' | 'cancel' | 'default'
}

export const StatePanel: React.FC<StatePanelProps> = (props) => {
  if (props.variant === 'default') {
    return null
  }

  const icon = {
    success: (
      <Box
        sx={{ width: 80, height: 80, objectFit: 'contain' }}
        component="img"
        src={checkMedia}
        alt="icone com estado"
      />
    ),
    cancel: (
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
    default: null,
  }[props.variant]

  const color = {
    success: 'success',
    cancel: 'primary',
    default: 'success',
  }[props.variant] as 'success' | 'error'

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
      <Zoom in>{icon}</Zoom>
    </Box>
  )
}
