import React, { useEffect } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Box } from '@mui/material'
import {
  CreateAlert,
  GetAlerts,
  RemoveAlert,
  UpdateAlert,
} from '@/domain/usecases'
import { PageContainer, PageTitle } from '@/presentation/components'
import {
  CreateAlertForm,
  PageAlertPanel,
} from '@/presentation/pages/alerts/components'
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
  const [servicesAlert, setServicesAlert] = useRecoilState(
    State.servicesAlertState,
  )
  const [historyAlert, setHistoryAlert] = useRecoilState(
    State.historyAlertState,
  )

  useEffect(() => {
    setLoading(true)
    props.getAlerts
      .get()
      .then((alerts) => {
        const homeAlert = alerts.find((alert) => alert.type === 'home')
        if (homeAlert) setHomeAlert(homeAlert)
        const servicesAlert = alerts.find((alert) => alert.type === 'services')
        if (servicesAlert) setServicesAlert(servicesAlert)
        const historyAlert = alerts.find((alert) => alert.type === 'history')
        if (historyAlert) setHistoryAlert(historyAlert)
      })
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
        <PageAlertPanel
          entryDirection="right"
          message={homeAlert.message}
          type="home"
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
        <PageAlertPanel
          entryDirection="left"
          message={servicesAlert.message}
          type="services"
          onAdd={() => {
            resetNewAlert()
            setNewAlert((currentState) => ({
              ...currentState,
              type: 'services',
            }))
            setOpen(true)
          }}
          onEdit={() => {
            if (servicesAlert) setNewAlert(servicesAlert)
            setOpen(true)
          }}
        />
        <PageAlertPanel
          entryDirection="right"
          message={historyAlert.message}
          type="history"
          onAdd={() => {
            resetNewAlert()
            setNewAlert((currentState) => ({
              ...currentState,
              type: 'history',
            }))
            setOpen(true)
          }}
          onEdit={() => {
            if (historyAlert) setNewAlert(historyAlert)
            setOpen(true)
          }}
        />
      </Box>

      <CreateAlertForm
        removeAlert={props.removeAlert}
        createAlert={props.createAlert}
        updateAlert={props.updateAlert}
      />
    </PageContainer>
  )
}

export default AlertsPage
