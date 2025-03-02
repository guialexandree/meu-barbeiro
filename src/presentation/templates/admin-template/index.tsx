import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Box } from '@mui/material'
import { appNavigation } from '@/main/configs'
import { AppBar, Drawer, PrivateRoute } from '@/presentation/components'

export const AdminTemplate: React.FC = () => {
  React.useLayoutEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#2c82d8')
    }
  }, [])

  return (
    <PrivateRoute>
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'background.default' : 'inherit'),
          height: '100%',
          minHeight: '100%',
        }}
      >
        <AppBar />
        <Drawer items={appNavigation} />
        <Outlet />
        <ToastContainer autoClose={7000} hideProgressBar={false} theme="dark" position="bottom-right" />
      </Box>
    </PrivateRoute>
  )
}
