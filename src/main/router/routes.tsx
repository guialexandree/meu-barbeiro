import { lazy } from 'react'
import { RecoilRoot } from 'recoil'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AdminTemplate, LoginTemplate } from '@/presentation/templates'
import { Loadable, ThemeProvider } from '@/presentation/components'

import LoginPage from '@/presentation/pages/login/login-page'
import RecoveryPasswordPage from '@/presentation/pages/recovery-password'
const AttendanceQueuePage = lazy(() => import('@/presentation/pages/attendance-queue'))
const ServicesPage = lazy(() => import('@/presentation/pages/services/services-page'))
const ServiceFormPage = lazy(() => import('@/presentation/pages/service-form/service-form-page'))
const AlertsPage = lazy(() => import('@/presentation/pages/alerts/alerts-page'))
const ClientsPage = lazy(() => import('@/presentation/pages/clients/clients-page'))
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
        element: <Loadable children={<ClientsPage />} />,
      },
      {
        path: '/relatorios',
        element: <Loadable children={<FinancialPage />} />,
      },
      {
        path: '/servicos',
        element: <Loadable children={<ServicesPage />} />,
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
