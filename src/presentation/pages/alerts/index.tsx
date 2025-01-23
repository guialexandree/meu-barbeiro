import React, { useEffect } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Box } from '@mui/material'
import { CreateAlert, GetAlerts, GetAlertsResult, RemoveAlert, UpdateAlert } from '@/domain/usecases'
import { PageContainer, PageTitle } from '@/presentation/components'
import { CreateUpdateAlertForm, PageAlertContainer, PageAlertContent } from '@/presentation/pages/alerts/components'
import * as State from '@/presentation/pages/alerts/components/atoms'
import notificationImg from '@/presentation/assets/notification-header.png'

type AlertsPageProps = {
  getAlerts: GetAlerts
  createAlert: CreateAlert
  updateAlert: UpdateAlert
  removeAlert: RemoveAlert
}

const AlertsPage: React.FC<AlertsPageProps> = (props) => {
  const setOpen = useSetRecoilState(State.isOpenState)
  const setLoading = useSetRecoilState(State.isLoadingLoadAlertsState)
  const setNewAlert = useSetRecoilState(State.newAlertState)
  const resetNewAlert = useResetRecoilState(State.newAlertState)
  const [homeAlert, setHomeAlert] = useRecoilState(State.homeAlertState)
  const [servicesAlert, setServicesAlert] = useRecoilState(State.servicesAlertState)
  const [historyAlert, setHistoryAlert] = useRecoilState(State.historyAlertState)

  const startAlerts = (alerts: GetAlertsResult) => {
    const homeAlert = alerts.find((alert) => alert.type === 'home')
    if (homeAlert) setHomeAlert(homeAlert)
    const servicesAlert = alerts.find((alert) => alert.type === 'services')
    if (servicesAlert) setServicesAlert(servicesAlert)
    const historyAlert = alerts.find((alert) => alert.type === 'history')
    if (historyAlert) setHistoryAlert(historyAlert)
  }

  useEffect(() => {
    setLoading(true)
    props.getAlerts
      .get()
      .then(startAlerts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageContainer>
      <PageTitle
        title="Avisos"
        subtitle="Configure avisos para exibir nas principais telas do app do cliente"
        icon={notificationImg}
      />

      <Box mx={2}>
        <PageAlertContainer entryDirection="right" type="home">
          <PageAlertContent
            message={homeAlert.message}
            onAdd={() => {
              resetNewAlert()
              setNewAlert((currentState) => ({ ...currentState, type: 'home' }))
              setOpen(true)
            }}
            onEdit={() => {
              if (homeAlert) setNewAlert(homeAlert)
              setOpen(true)
            }}
          />
        </PageAlertContainer>

        <PageAlertContainer entryDirection="left" type="services">
          <PageAlertContent
            message={servicesAlert.message}
            onAdd={() => {
              resetNewAlert()
              setNewAlert((currentState) => ({ ...currentState, type: 'services' }))
              setOpen(true)
            }}
            onEdit={() => {
              if (servicesAlert) setNewAlert(servicesAlert)
              setOpen(true)
            }}
          />
        </PageAlertContainer>

        <PageAlertContainer entryDirection="right" type="history">
          <PageAlertContent
            message={historyAlert.message}
            onAdd={() => {
              resetNewAlert()
              setNewAlert((currentState) => ({ ...currentState, type: 'history' }))
              setOpen(true)
            }}
            onEdit={() => {
              if (historyAlert) setNewAlert(historyAlert)
              setOpen(true)
            }}
          />
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
