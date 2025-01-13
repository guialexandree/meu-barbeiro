import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { GetAlerts } from '@/domain/usecases'
import { PageContainer, PageTitle } from '@/presentation/components'
import {
  CreateAlertForm,
  PageAlertPanel,
} from '@/presentation/pages/alerts/components'
import * as State from '@/presentation/pages/alerts/components/atoms'
import notificationImg from '@/presentation/assets/notification-header.png'

type AlertsPageProps = {
  getAlerts: GetAlerts
}

const AlertsPage: React.FC<AlertsPageProps> = (props) => {
  const setOpen = useSetRecoilState(State.isOpenState)
  const setLoading = useSetRecoilState(State.isLoadingState)
  const setAlerts = useSetRecoilState(State.alertsState)

  useEffect(() => {
    setLoading(true)
    props.getAlerts
      .get()
      .then(setAlerts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageContainer>
      <PageTitle
        title="Avisos"
        subtitle="Cadastre avisos para serem exibidos nas principais telas do app do cliente"
        icon={notificationImg}
      />

      <PageAlertPanel
        message=""
        type="home"
        onAdd={() => {
          setOpen(true)
        }}
      />
      <PageAlertPanel
        message=""
        type="services"
        onAdd={() => {
          setOpen(true)
        }}
      />
      <PageAlertPanel
        message=""
        type="history"
        onAdd={() => {
          setOpen(true)
        }}
      />

      <CreateAlertForm />
    </PageContainer>
  )
}

export default AlertsPage
