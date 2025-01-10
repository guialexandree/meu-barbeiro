import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppBar, Drawer, ThemeProvider } from '@/presentation/components'
import { appNavigation } from '@/main/configs'

export const AdminTemplate: React.FC = () => {
  return (
    <ThemeProvider>
      <AppBar />
      <Drawer items={appNavigation} />
      <Outlet />
    </ThemeProvider>
  )
}

