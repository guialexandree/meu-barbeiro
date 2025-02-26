import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppBar, Drawer, PrivateRoute } from '@/presentation/components'
import { appNavigation } from '@/main/configs'
import { Box } from '@mui/material'
import { ToastContainer } from 'react-toastify'

export const AdminTemplate: React.FC = () => {
  return (
    <PrivateRoute>
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'background.default' : 'inherit'),
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
