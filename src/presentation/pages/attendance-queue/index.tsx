import { PageContainer, PageTitle } from '@/presentation/components'
import React from 'react'
import attendanceHeaderImg from '@/presentation/assets/aparador.png'
import { List, ListItem } from '@mui/material'
import { _mockClients } from '@/domain/tests'

const AttendanceQueuePage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle
        title="Fila de Atedimento"
        subtitle="Acompanhe a fila de atendimento"
        icon={attendanceHeaderImg}
      />

      <List>
        {_mockClients.map((client) => (
          <ListItem key={client.id}>{client.name}</ListItem>
        ))}
      </List>
    </PageContainer>
  )
}

export default AttendanceQueuePage
