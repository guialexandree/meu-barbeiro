import React from 'react'
import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import { Box, useTheme } from '@mui/material'
import { appNavigation } from '@/main/configs'
import { PrivateRoute } from '@/presentation/components'
import { AppBar, Drawer } from './components'

export const AdminTemplate: React.FC = () => {
  const theme = useTheme()

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
          backgroundColor: 'background.default',
          height: '100vh',
        }}
      >
        <AppBar />
        <Drawer items={appNavigation} />
        <Outlet />
        <ToastContainer autoClose={5000} theme="colored" position="top-right" draggable transition={Bounce} limit={2} />
      </Box>
    </PrivateRoute>
  )
}
