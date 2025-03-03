import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Box } from '@mui/material'
import { PageContainer, PageTitle } from '@/presentation/components'
import { CreateUpdateAlertForm, PageAlert } from '@/presentation/pages/alerts/components'
import notificationImg from '@/presentation/assets/notification-header.png'
import { AlertModel } from '@/domain/models'
import { State } from '@/presentation/pages/alerts/components/atoms'
import { Factories } from '@/main/factories/usecases'

const AlertsPage: React.FC = () => {
  const setHomeAlert = useSetRecoilState(State.homeAlertState)
  const setServicesAlert = useSetRecoilState(State.servicesAlertState)
  const setHistoryAlert = useSetRecoilState(State.historyAlertState)

  const getAlerts = React.useMemo(() => Factories.makeRemoteLoadAlerts(), [])

  const startAlerts = (alerts: AlertModel[]) => {
    const homeAlert = alerts.find((alert) => alert.type === 'home')
    if (homeAlert) setHomeAlert(homeAlert)
    const servicesAlert = alerts.find((alert) => alert.type === 'services')
    if (servicesAlert) setServicesAlert(servicesAlert)
    const historyAlert = alerts.find((alert) => alert.type === 'history')
    if (historyAlert) setHistoryAlert(historyAlert)
  }

  const loadAlerts = React.useCallback(async (): Promise<void> => {
    const alerts = await getAlerts.get()
    startAlerts(alerts.data)
  }, [])

  return (
    <PageContainer onInit={loadAlerts}>
      <PageTitle
        title="Avisos"
        subtitle="Configure avisos para exibir nas principais telas do app do cliente"
        icon={notificationImg}
      />

      <Box mx={2}>
        <PageAlert alertState={State.homeAlertState} entryDirection="right" type="home" />
        <PageAlert alertState={State.servicesAlertState} entryDirection="left" type="services" />
        <PageAlert alertState={State.historyAlertState} entryDirection="right" type="history" />
      </Box>

      <CreateUpdateAlertForm />
    </PageContainer>
  )
}

export default AlertsPage
