import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Box, useTheme } from '@mui/material'
import { appNavigation } from '@/main/configs'
import { AppBar, Drawer } from '@/presentation/components'

export const AdminTemplate: React.FC = () => {
  const theme = useTheme()

  React.useLayoutEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.palette.primary.main)
    }
  }, [])

  return (
    // <PrivateRoute>
      <Box
        sx={{
          backgroundColor: 'background.default',
        }}
      >
        <AppBar />
        <Drawer items={appNavigation} />
        <Outlet />
        <ToastContainer autoClose={7000} theme="light" position="bottom-right" />
      </Box>
    // </PrivateRoute>
  )
}
