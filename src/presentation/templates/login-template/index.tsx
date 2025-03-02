import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Grid2, useMediaQuery, useTheme } from '@mui/material'
import { Logo, RedirectProductLink, SocialMidias } from '@/presentation/components'
import backgroundImg from '@/presentation/assets/login-bg.webp'
import { useMobile } from '@/presentation/hooks'

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

  const subtractPaddingToolbar = typeof theme.mixins.toolbar.minHeight === 'number'
    ? process.env.NODE_ENV === 'development' ? 0 : theme.mixins.toolbar.minHeight + 24
    : 0

  React.useLayoutEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#131313')
    }
  }, [])

  return (
    <Grid2
      container
      sx={{
        minHeight: `calc(100vh - ${isPWA ? 0 : subtractPaddingToolbar}px)`,
        height: `calc(100vh - ${isPWA ? 0 : subtractPaddingToolbar}px)`,
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
            ...pulseAnimation(25, 1.2),
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
        <Box sx={{ zIndex: 1, position: 'relative' }}>
          <Outlet />
        </Box>
        <Logo
          size={180}
          showMobile={mobile}
          sx={{
            ...pulseAnimation(15, 1.05),
            width: '100%',
          }}
        />

        <SocialMidias />

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
