import { lazy } from 'react'
import { RecoilRoot } from 'recoil'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/presentation/components'

const LoginPage = lazy(() => import('@/presentation/pages/login') )

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
])

export const Router = () => {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  )
}
