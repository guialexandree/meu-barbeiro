import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Box, useTheme } from '@mui/material'
import { appNavigation } from '@/main/configs'
import { AppBar, Drawer, PrivateRoute } from '@/presentation/components'
import { useMobile } from '@/presentation/hooks'

export const AdminTemplate: React.FC = () => {
  const theme = useTheme()
  const { isPWA } = useMobile()
  const subtractPaddingToolbar = typeof theme.mixins.toolbar.minHeight === 'number'
    ? process.env.NODE_ENV === 'development' ? 0 : theme.mixins.toolbar.minHeight + 24
    : 0

  React.useLayoutEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.palette.primary.main)
    }
  }, [])

  return (
    <PrivateRoute>
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'background.default' : 'inherit'),
          minHeight: `calc(100vh - ${isPWA ? 0 : subtractPaddingToolbar}px)`,
          height: `calc(100vh - ${isPWA ? 0 : subtractPaddingToolbar}px)`,
        }}
      >
        <AppBar />
        <Drawer items={appNavigation} />
        <Outlet />
        <ToastContainer autoClose={7000} theme="light" position="bottom-right" />
      </Box>
    </PrivateRoute>
  )
}
