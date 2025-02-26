import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppBar, Drawer } from '@/presentation/components'
import { appNavigation } from '@/main/configs'
import { Box } from '@mui/material'
import { ToastContainer } from 'react-toastify'

export const AdminTemplate: React.FC = () => {
  React.useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#2c82d8')
    }
  }, [])

  return (
    <Box
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'background.default' : 'inherit'),
        height: '100vh',
        minHeight: '100vh',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <AppBar />
      <Drawer items={appNavigation} />
      <Outlet />
      <ToastContainer autoClose={7000} hideProgressBar={false} theme="dark" position="bottom-right" />
    </Box>
  )
}
