import React from 'react'
import { Fab, Icon, Stack, Zoom } from '@mui/material'
import { GetClients } from '@/domain/usecases'
import { PageContainer, ValueIndicator } from '@/presentation/components'
import { ClientList } from '@/presentation/pages/clients/components'

type ClientsPageProps = {
  getClients: GetClients
}

const ClientsPage: React.FC<ClientsPageProps> = (props) => {
  return (
    <PageContainer title='Clientes' subtitle='Visualizar cadastro de clientes com informações de contato'>
      <Stack direction='row' spacing={1} mx={2} mb={1}>
        <ValueIndicator
          title='Total de clientes'
          value='682'
          entryDirection='right'
          icon='peoples'
        />

        <ValueIndicator
          title='Novos clientes'
          value='23'
          subvalue='10%'
          descriptionSubvalue='10% de crescimento em relação ao mês anterior'
          entryDirection='left'
          icon='grade'
        />
      </Stack>

      <ClientList getClients={props.getClients} />

      <Stack direction="row" justifyContent="center">
        <Zoom in>
          <Fab
            onClick={() => {}}
            sx={{
              position: 'fixed',
              bottom: '16px',
              opacity: 0.8,
              transition: 'opacity 0.3s',
              ':hover': { opacity: 1 },
              ':active': { opacity: 1 },
            }}
          >
            <Icon sx={{ fontSize: 36, color: 'primary.dark' }}>add</Icon>
          </Fab>
        </Zoom>
      </Stack>
    </PageContainer>
  )
}

export default ClientsPage
