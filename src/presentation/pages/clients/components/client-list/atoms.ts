import { _mockClients } from '@/domain/tests'
import { atom, selector } from 'recoil'

export const clientsState = atom({
  key: 'clientsState',
  default: _mockClients,
})

export const textClientsSearchState = atom({
  key: 'textClientsSearchState',
  default: '',
})

export const clientsSearchedState = selector({
  key: 'clientsSearchedState',
  get: ({ get }) => {
    const textSearched = get(textClientsSearchState)
    const clients = get(clientsState)

    if (textSearched.trim()) {
      return clients?.filter(client => client.name.toLowerCase().includes(textSearched.toLowerCase())) ?? []
    }

    return clients
  }
})
