import { PageContainer, PageTitle } from '@/presentation/components'
import React from 'react'
import attendanceHeaderImg from '@/presentation/assets/aparador.png'
import { Avatar, List, ListItem, ListItemAvatar } from '@mui/material'
import { _mockClients } from '@/domain/tests'
import avatarImg from '@/presentation/assets/avatars/avataaars.svg'

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
          <ListItem key={client.id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={avatarImg} />
            </ListItemAvatar>
          </ListItem>
        ))}
      </List>
    </PageContainer>
  )
}

export default AttendanceQueuePage
