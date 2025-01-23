import React, { useEffect } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Backdrop, Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { CreateAlert, LoadAlerts, LoadAlertsResult, RemoveAlert, UpdateAlert } from '@/domain/usecases'
import { PageContainer, PageTitle } from '@/presentation/components'
import { CreateUpdateAlertForm, PageAlertContainer, PageAlertContent } from '@/presentation/pages/alerts/components'
import * as State from '@/presentation/pages/alerts/components/atoms'
import notificationImg from '@/presentation/assets/notification-header.png'
import emptyListImg from '@/presentation/assets/empty-list.svg'
import errorListImg from '@/presentation/assets/error-list.svg'

type AlertsPageProps = {
  getAlerts: LoadAlerts
  createAlert: CreateAlert
  updateAlert: UpdateAlert
  removeAlert: RemoveAlert
}

const AlertsPage: React.FC<AlertsPageProps> = (props) => {
  const setOpen = useSetRecoilState(State.isOpenState)
  const setNewAlert = useSetRecoilState(State.newAlertState)
  const resetNewAlert = useResetRecoilState(State.newAlertState)
  const [loading, setLoading] = useRecoilState(State.isLoadingLoadAlertsState)
  const [error, setError] = useRecoilState(State.errorAlertsState)
  const [homeAlert, setHomeAlert] = useRecoilState(State.homeAlertState)
  const [servicesAlert, setServicesAlert] = useRecoilState(State.servicesAlertState)
  const [historyAlert, setHistoryAlert] = useRecoilState(State.historyAlertState)

  useEffect(() => {
    loadAlerts()
  }, [])

  if (error) {
    return (
      <Stack sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} alignItems="center" spacing={1}>
        <Box component="img" src={errorListImg} alt="Erro ao carregar serviços" width={180} height={180} />
        <Typography variant="h6" align="center">
          Erro ao carregar alertas
        </Typography>
        <Button variant="outlined" color="primary" onClick={() => {
          setError('')
          loadAlerts()
          }}>
          tentar novamente
        </Button>
      </Stack>
    )
  }

  if (loading) {
    return (
      <Backdrop open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
    )
  }

  if (!homeAlert.message && !servicesAlert.message && !historyAlert.message) {
    return (
      <Stack sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} alignItems="center" spacing={1}>
        <Box component="img" src={emptyListImg} alt="Nenhum alerta cadastrado" width={160} height={160} />
        <Typography variant="h6" align="center">
          Nenhum alerta cadastrado
        </Typography>
        <Button variant="outlined" color="primary">
          criar novo
        </Button>
      </Stack>
    )
  }

  const startAlerts = (alerts: LoadAlertsResult) => {
    const homeAlert = alerts.find((alert) => alert.type === 'home')
    if (homeAlert) setHomeAlert(homeAlert)
    const servicesAlert = alerts.find((alert) => alert.type === 'services')
    if (servicesAlert) setServicesAlert(servicesAlert)
    const historyAlert = alerts.find((alert) => alert.type === 'history')
    if (historyAlert) setHistoryAlert(historyAlert)
  }

  const loadAlerts = () => {
    setLoading(true)
    props.getAlerts
      .get()
      .then(startAlerts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }


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
