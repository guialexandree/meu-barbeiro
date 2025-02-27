import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Box } from '@mui/material'
import { appNavigation } from '@/main/configs'
import { AppBar, Drawer, PrivateRoute } from '@/presentation/components'
import { useMobile } from '@/presentation/hooks'

export const AdminTemplate: React.FC = () => {
  const { isPWA } = useMobile()
  const pwa = isPWA()

  React.useEffect(() => {
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
          height: `calc(100vh - ${pwa ? 0 : 72}px)`,
          minHeight: `calc(100vh - ${pwa ? 0 : 72}px)`,
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
