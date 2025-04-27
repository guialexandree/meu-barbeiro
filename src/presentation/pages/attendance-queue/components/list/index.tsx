import React from 'react'
import { useRecoilValue } from 'recoil'
import { List } from '@/presentation/components'
import { State } from '@/presentation/pages/user-list/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { Fade, Stack, Typography } from '@mui/material'
import { UserItem } from '../user-item'

type AttendanceQueueListProps = {
  onReload: VoidFunction
}

export const AttendanceQueueList: React.FC<AttendanceQueueListProps> = (props) => {
  const clientsResult = useRecoilValue(State.List.usersResultState)
  const company = useRecoilValue(GenericState.companyState)

  if (company?.statusAttendance !== 'serving') {
    return null
  }

  return (
    <Stack>
      <Typography mx={2} mt={2} variant="h6" fontWeight={900} fontFamily="Inter" letterSpacing={1} >
        PRÓXIMOS NA FILA
      </Typography>

      <List
        id="attendance-queue-list"
        onReload={props.onReload}
        listState={State.listState}
        messagesStates={{
          noResults: `Nenhum cliente na fila`,
          error: 'Erro ao carregar fila de atendimento',
        }}
      >
        {clientsResult?.data?.slice(1, 4)?.map((client, index) => (
        <Fade in timeout={700} style={{ transitionDelay: `${index * 100}ms` }} key={client.id}>
          <span>
            <UserItem user={client} />
          </span>
        </Fade>
      ))}
      </List>
    </Stack>
  )
}
