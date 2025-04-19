import { lazy } from 'react'
import { RecoilRoot } from 'recoil'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AdminTemplate, LoginTemplate } from '@/presentation/templates'
import { Loadable, ThemeProvider } from '@/presentation/components'

import LoginPage from '@/presentation/pages/login/login-page'
import RecoveryPasswordPage from '@/presentation/pages/recovery-password'
const AttendanceQueuePage = lazy(() => import('@/presentation/pages/attendance-queue'))
const ServiceListPage = lazy(() => import('@/presentation/pages/service-list/service-list-page'))
const ServiceFormPage = lazy(() => import('@/presentation/pages/service-form/service-form-page'))
const UserFormPage = lazy(() => import('@/presentation/pages/user-form/user-form-page'))
const UsersListPage = lazy(() => import('@/presentation/pages/user-list/user-list-page'))
const AlertsPage = lazy(() => import('@/presentation/pages/alerts/alerts-page'))
const FinancialPage = lazy(() => import('@/presentation/pages/financial'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminTemplate />,
    children: [
      {
        path: '/',
        element: <Loadable children={<AttendanceQueuePage />} />,
      },
      {
        path: '/clientes',
        element: <Loadable children={<UsersListPage />} />,
      },
      {
        path: '/clientes/criar-novo',
        element: <Loadable children={<UserFormPage />} />,
      },
      {
        path: '/relatorios',
        element: <Loadable children={<FinancialPage />} />,
      },
      {
        path: '/servicos',
        element: <Loadable children={<ServiceListPage />} />,
      },
      {
        path: '/servico/criar-novo',
        element: <Loadable children={<ServiceFormPage />} />,
      },
      {
        path: '/servico/:id',
        element: <Loadable children={<ServiceFormPage />} />,
      },
      {
        path: '/avisos',
        element: <Loadable children={<AlertsPage />} />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginTemplate />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/login/esqueci-minha-senha',
        element: <RecoveryPasswordPage />,
      },
    ],
  },
])

export const Router = () => {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ThemeProvider>
  )
}
