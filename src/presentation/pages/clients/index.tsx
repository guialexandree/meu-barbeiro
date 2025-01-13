import React from 'react'
import { PageContainer, PageTitle } from '@/presentation/components'
import { CreateAlertForm } from '@/presentation/pages/alerts/components'
import ClientList from './components/client-list'
import clientesHeaderImg from '@/presentation/assets/clients-header3.png'

const ClientsPage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle
        title="Clientes"
        subtitle="Visualizar cadastro de clientes com informações de contato"
        icon={clientesHeaderImg}
      />

      <ClientList />

      <CreateAlertForm />
    </PageContainer>
  )
}

export default ClientsPage
