import { lazy } from 'react'
import { RecoilRoot } from 'recoil'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AdminTemplate } from '@/presentation/templates'
import { Loadable } from '@/presentation/components'
import * as Factories from '@/main/factories/usecases'

const LoginPage = lazy(() => import('@/presentation/pages/login'))
const AttendanceQueuePage = lazy(
  () => import('@/presentation/pages/attendance-queue'),
)
const ServicesPage = lazy(() => import('@/presentation/pages/services'))
const AlertsPage = lazy(() => import('@/presentation/pages/alerts'))
const ClientsPage = lazy(() => import('@/presentation/pages/clients'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AdminTemplate />,
    children: [
      {
        path: '/fila-atendimento',
        element: <Loadable children={<AttendanceQueuePage />} />,
      },
      {
        path: '/clientes',
        element: <Loadable children={<ClientsPage />} />,
      },
      {
        path: '/servicos',
        element: (
          <Loadable
            children={
              <ServicesPage
                getServices={Factories.makeRemoteGetServices()}
                updateService={Factories.makeRemoteUpdateService()}
              />
            }
          />
        ),
      },
      {
        path: '/avisos',
        element: (
          <Loadable
            children={
              <AlertsPage getAlerts={Factories.makeRemoteGetAlerts()} />
            }
          />
        ),
      },
    ],
  },
])

export const Router = () => {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}
