import React from 'react'
import { Box, Zoom } from '@mui/material'
import checkMedia from '@/presentation/assets/check.gif'

type SuccessPanelProps = {
  success: boolean
}

export const SuccessPanel: React.FC<SuccessPanelProps> = (props) => {

  if (!props.success) {
    return null
  }
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundColor: (theme) => `${theme.palette.success.main}90`,
        zIndex: 1,
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        width: '100%',
      }}
    >
      <Zoom in>
        <Box
          sx={{ width: 80, height: 80, objectFit: 'contain' }}
          component="img"
          src={checkMedia}
          alt="icone de check"
        />
      </Zoom>
    </Box>
  )
}
