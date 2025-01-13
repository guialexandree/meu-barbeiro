import React from 'react'
import {
  Avatar,
  Card,
  CardContent,
  Slide,
  Stack,
  Typography,
} from '@mui/material'
import { PageContainer } from '@/presentation/components'
import { CreateAlertForm } from '@/presentation/pages/alerts/components'
import clientesHeaderImg from '@/presentation/assets/clients-header3.png'
import ClientList from './components/client-list'

const ClientsPage: React.FC = () => {
  return (
    <PageContainer>
      <Slide direction="left" in mountOnEnter unmountOnExit>
        <Card sx={{ mx: 3, mb: 2, pb: 0, boxShadow: 3 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center" pl='18%'>
              <Avatar src={clientesHeaderImg} sx={{ width: 110, height: 110, position: 'absolute', left: -8 }} />

              <Stack direction="column">
                <Typography variant="h6">Clientes</Typography>
                <Typography variant="body2" color="grey.500" lineHeight={1}>
                  Visualizar cadastro de clientes com informações de contato
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Slide>

      <ClientList />

      <CreateAlertForm />
    </PageContainer>
  )
}

export default ClientsPage
