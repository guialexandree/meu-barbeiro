import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Box, Button, Stack, Typography } from '@mui/material'
import { PageContainer } from '@/presentation/components'
import { CreateUpdateAlertForm, PageAlert } from '@/presentation/pages/alerts/components'
import { AlertModel } from '@/domain/models'
import { State } from '@/presentation/pages/alerts/components/atoms'
import { Factories } from '@/main/factories/usecases'
import errorListImg from '@/presentation/assets/error-list.svg'

const AlertsPage: React.FC = () => {
  const setHomeAlert = useSetRecoilState(State.homeAlertState)
  const setServicesAlert = useSetRecoilState(State.servicesAlertState)
  const setHistoryAlert = useSetRecoilState(State.historyAlertState)
  const [loading, setLoading] = useRecoilState(State.loadingAlertsState)
  const [error, setError] = useRecoilState(State.errorAlertsState)

  const loadAlerts = React.useMemo(() => Factories.makeRemoteLoadAlerts(), [])

  const startAlerts = (alerts: AlertModel[]) => {
    const homeAlert = alerts.find((alert) => alert.type === 'home')
    if (homeAlert) setHomeAlert(homeAlert)
    const servicesAlert = alerts.find((alert) => alert.type === 'services')
    if (servicesAlert) setServicesAlert(servicesAlert)
    const historyAlert = alerts.find((alert) => alert.type === 'history')
    if (historyAlert) setHistoryAlert(historyAlert)
  }

  const onInit = React.useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      setError('')
      const alertsResult = await loadAlerts.load()
      if (alertsResult.success) {
        startAlerts(alertsResult.data)
        return
      }

      setError(alertsResult.error)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  if (error) {
    return (
      <Stack id="error-list" sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7}} alignItems="center" spacing={1}>
        <Box component="img" src={errorListImg} alt="Erro ao carregar alertas" width={180} height={180} />
        <Typography variant="h6" align="center" color='white'>
          Erro ao carregar alertas
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          id="reload-request"
          onClick={() => {
            setError('')
            onInit()
          }}
        >
          tentar novamente
        </Button>
      </Stack>
    )
  }

  return (
    <PageContainer
      onInit={onInit}
      title="Avisos"
      subtitle="Configure avisos para exibir nas principais telas do app do cliente"
    >
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
