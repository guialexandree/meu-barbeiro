import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppBar, Drawer } from '@/presentation/components'
import { appNavigation } from '@/main/configs'
import { Box } from '@mui/material'
import { ToastContainer } from 'react-toastify'

export const AdminTemplate: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'background.default' : 'inherit'),
        height: '100vh',
        minHeight: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          height: 'calc(100vh - env(safe-area-inset-top))',
          minHeight: 'calc(100vh - env(safe-area-inset-top))',
        },
      }}
    >
      <AppBar />
      <Drawer items={appNavigation} />
      <Outlet />
      <ToastContainer autoClose={7000} hideProgressBar={false} theme="dark" position="bottom-right" />
    </Box>
  )
}
