import React from 'react'
import { useRecoilValue } from 'recoil'
import { Fade } from '@mui/material'
import { ServiceListItem } from '@/presentation/pages/service-list/components'
import { State } from '@/presentation/pages/service-list/components/atoms'
import { List } from '@/presentation/components'

type ServiceListProps = {
  onReload: VoidFunction
}

export const ServiceList: React.FC<ServiceListProps> = (props) => {
  const servicesList = useRecoilValue(State.List.servicesState)
  const search = useRecoilValue(State.List.textSearchState)

  return (
    <List
      id="service-list"
      onReload={props.onReload}
      listState={State.listState}
      messagesStates={{
        noResults: `Nenhum serviço foi encontrado com o filtro ${search?.toLocaleUpperCase()}`,
        error: 'Erro ao carregar serviços',
      }}
    >
      {servicesList.map((service, index) => (
        <Fade in timeout={700} style={{ transitionDelay: `${index * 100}ms` }} key={service.id}>
          <span>
            <ServiceListItem service={service} />
          </span>
        </Fade>
      ))}
    </List>
  )
}
