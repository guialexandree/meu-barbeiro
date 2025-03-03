import { lazy } from 'react'
import { RecoilRoot } from 'recoil'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AdminTemplate, LoginTemplate } from '@/presentation/templates'
import { Loadable, ThemeProvider } from '@/presentation/components'
import * as Factories from '@/main/factories/usecases'

import LoginPage from '@/presentation/pages/login'
import RecoveryPasswordPage from '@/presentation/pages/recovery-password'
const AttendanceQueuePage = lazy(() => import('@/presentation/pages/attendance-queue'))
const ServicesPage = lazy(() => import('@/presentation/pages/services'))
const ServiceCreatePage = lazy(() => import('@/presentation/pages/service-create'))
const AlertsPage = lazy(() => import('@/presentation/pages/alerts'))
const ClientsPage = lazy(() => import('@/presentation/pages/clients'))
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
        element: <Loadable children={<ClientsPage getClients={Factories.makeRemoteGetClients()} />} />,
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
        path: '/novo-servico',
        element: <Loadable children={<ServiceCreatePage />} />,
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
