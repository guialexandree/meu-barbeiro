import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Box } from '@mui/material'
import { CreateAlert, LoadAlerts, LoadAlertsResult, RemoveAlert, UpdateAlert } from '@/domain/usecases'
import { PageContainer, PageTitle } from '@/presentation/components'
import { CreateUpdateAlertForm, PageAlertContainer, PageAlertContent } from '@/presentation/pages/alerts/components'
import * as State from '@/presentation/pages/alerts/components/atoms'
import notificationImg from '@/presentation/assets/notification-header.png'

type AlertsPageProps = {
  getAlerts: LoadAlerts
  createAlert: CreateAlert
  updateAlert: UpdateAlert
  removeAlert: RemoveAlert
}

const AlertsPage: React.FC<AlertsPageProps> = (props) => {
  const setHomeAlert = useSetRecoilState(State.homeAlertState)
  const setServicesAlert = useSetRecoilState(State.servicesAlertState)
  const setHistoryAlert = useSetRecoilState(State.historyAlertState)

  const startAlerts = (alerts: LoadAlertsResult) => {
    const homeAlert = alerts.find((alert) => alert.type === 'home')
    if (homeAlert) setHomeAlert(homeAlert)
    const servicesAlert = alerts.find((alert) => alert.type === 'services')
    if (servicesAlert) setServicesAlert(servicesAlert)
    const historyAlert = alerts.find((alert) => alert.type === 'history')
    if (historyAlert) setHistoryAlert(historyAlert)
  }

  const loadAlerts = React.useCallback(async (): Promise<void> => {
    const alerts = await props.getAlerts.get()
    startAlerts(alerts)
  }, [])

  return (
    <PageContainer loadPage={loadAlerts}>
      <PageTitle
        title="Avisos"
        subtitle="Configure avisos para exibir nas principais telas do app do cliente"
        icon={notificationImg}
      />

      <Box mx={2}>
        <PageAlertContainer entryDirection="right" type="home">
          <PageAlertContent alertState={State.homeAlertState} type="home" />
        </PageAlertContainer>

        <PageAlertContainer entryDirection="left" type="services">
          <PageAlertContent alertState={State.servicesAlertState} type="services" />
        </PageAlertContainer>

        <PageAlertContainer entryDirection="right" type="history">
          <PageAlertContent alertState={State.historyAlertState} type="history" />
        </PageAlertContainer>
      </Box>

      <CreateUpdateAlertForm
        removeAlert={props.removeAlert}
        createAlert={props.createAlert}
        updateAlert={props.updateAlert}
      />
    </PageContainer>
  )
}

export default AlertsPage
