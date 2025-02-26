import React from 'react'
import { Box, Fade } from '@mui/material'
import logoImg from '@/presentation/assets/logo.png'

type LogoProps = {
  size?: number
  sx?: React.CSSProperties
  showMobile?: boolean
}

export const Logo: React.FC<LogoProps> = (props) => {
  if (!props.showMobile) {
    return undefined
  }

  return (
    <Fade in timeout={1200} mountOnEnter unmountOnExit>
      <Box
        component='img'
        src={logoImg}
        alt='Logo da barbearia'
        id='logo'
        height={props.size || 220}
        sx={{
          ...props.sx,
          objectFit: 'contain',
        }}
      />
    </Fade>
  )
}
