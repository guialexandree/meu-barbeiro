import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import {
  Avatar,
  Card,
  CardContent,
  Slide,
  Stack,
  Typography,
} from '@mui/material'
import { GetAlerts } from '@/domain/usecases'
import { PageContainer } from '@/presentation/components'
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
      <Slide direction="left" in mountOnEnter unmountOnExit>
        <Card sx={{ mx: 2, mb: 2, pb: 0, boxShadow: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={notificationImg} sx={{ width: 56, height: 56 }} />

              <Stack direction="column">
                <Typography variant="h6">Avisos</Typography>
                <Typography variant="body2" color="grey.500" lineHeight={1}>
                  Cadastre avisos para serem exibidos nas telas do app do
                  cliente
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Slide>

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
