import React from 'react'
import { useRecoilValue } from 'recoil'
import { Fade,  } from '@mui/material'
import { List } from '@/presentation/components'
import { State } from '@/presentation/pages/user-list/components/atoms'
import { UserItem } from '../user-item'

type UserListProps = {
  onReload: VoidFunction
}

export const UserList: React.FC<UserListProps> = (props) => {
  const clientsResult = useRecoilValue(State.List.usersResultState)
  const search = useRecoilValue(State.List.textSearchState)

  return (
    <List
      id="user-list"
      onReload={props.onReload}
      listState={State.listState}
      messagesStates={{
        noResults: `Nenhum cliente foi encontrado com o filtro ${search?.toLocaleUpperCase()}`,
        error: 'Erro ao carregar clientes',
      }}
    >
      {clientsResult?.data?.map((client, index) => (
        <Fade in timeout={700} style={{ transitionDelay: `${index * 100}ms` }} key={client.id}>
          <span>
            <UserItem user={client} />
          </span>
        </Fade>
      ))}
    </List>
  )
}
