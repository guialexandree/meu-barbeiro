import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Grid2, useMediaQuery, useTheme } from '@mui/material'
import { Logo, RedirectProductLink } from '@/presentation/components'
import { useMobile } from '@/presentation/hooks'
import backgroundImg from '@/presentation/assets/login-bg.webp'

const pulseAnimation = (timeout: number, scale: number) => ({
  animation: `pulse ${timeout}s infinite ease-in-out`,
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: `scale(${scale})`,
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
})

export const LoginTemplate: React.FC = () => {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { isPWA } = useMobile()
  const pwa = isPWA()
  

  return (
    <Grid2
      container
      sx={{
        minHeight: `calc(100vh - ${pwa ? 0 : 48}px)`,
        maxHeight: `calc(100vh - ${pwa ? 0 : 48}px)`,
        overflow: 'hidden',
        backgroundColor: (theme) => theme.palette.background.paper,
        backgroundImage: backgroundImg,
        color: 'white',
        position: 'relative',
      }}
    >
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Box
          component="img"
          src={backgroundImg}
          sx={{
            ...pulseAnimation(30, 1.2),
            display: { xs: 'block', sm: 'none' },
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundPositionY: '20%',
            zIndex: 0,
            opacity: 0.3,
          }}
        />
        <Logo
          size={180}
          showMobile={mobile}
          sx={{
            ...pulseAnimation(10, 1.05),
            position: 'absolute',
            bottom: 60,
            left: 0,
            zIndex: 1,
            width: '100%',
          }}
        />

        <Outlet />
        <RedirectProductLink />
      </Grid2>

      <Grid2
        sx={{
          display: { xs: 'none', sm: 'block' },
          backgroundColor: 'primary.main',
        }}
        size={{ md: 8 }}
      >
        <Box
          component="img"
          src={backgroundImg}
          sx={{
            width: '100%',
            height: '100%',
            display: { xs: 'none', sm: 'block' },
            objectFit: 'center',
            opacity: 0.6,
          }}
        />
      </Grid2>
    </Grid2>
  )
}
