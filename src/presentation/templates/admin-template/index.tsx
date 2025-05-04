import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Outlet } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import { Factories } from '@/main/factories/usecases'
import { Box, useTheme } from '@mui/material'
import { appNavigation } from '@/main/configs'
import { useNotify } from '@/presentation/hooks'
import { AppBar, Drawer } from './components'
import { GenericState } from '@/presentation/components/atoms'

export const AdminTemplate: React.FC = () => {
  const theme = useTheme()
  const { notify } = useNotify()
  const setCompany = useSetRecoilState(GenericState.companyState)

  const loadCompany = React.useMemo(() => Factories.makeRemoteLoadCompany(), [])

  React.useEffect(() => {
    loadCompany
      .load()
      .then((companyResult) => {
        if (companyResult.success) {
          setCompany(companyResult.data)
          return
        }

        notify(companyResult.error, { type: 'error' })
      })
      .catch(console.error)
  }, [])

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
        height: '100vh',
      }}
    >
      <AppBar />
      <Drawer items={appNavigation} />
      <Outlet />
      <ToastContainer autoClose={5000} theme="colored" position="top-right" draggable transition={Bounce} limit={2} />
    </Box>
    // </PrivateRoute>
  )
}
