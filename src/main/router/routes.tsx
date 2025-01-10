import { lazy } from 'react'
import { RecoilRoot } from 'recoil'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AdminTemplate } from '@/presentation/templates'
import { Loadable } from '@/presentation/components'

const LoginPage = lazy(() => import('@/presentation/pages/login'))
const AttendanceQueuePage = lazy(
  () => import('@/presentation/pages/attendance-queue'),
)
const ServicesPage = lazy(() => import('@/presentation/pages/services'))
const AlertsPage = lazy(() => import('@/presentation/pages/alerts'))


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
        path: '/servicos',
        element: <Loadable children={<ServicesPage />} />,
      },
      {
        path: '/avisos',
        element: <Loadable children={<AlertsPage />} />,
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
