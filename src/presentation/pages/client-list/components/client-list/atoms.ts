import { LoadClientsResult } from '@/domain/usecases'
import { atom, selector } from 'recoil'

export const clientsResultState = atom<LoadClientsResult>({
  key: 'clientsState',
  default: null as unknown as LoadClientsResult,
})

export const showFilterState = atom({
  key: 'showFilterClientsState',
  default: true
})

export const textSearchState = atom({
  key: 'textClientsSearchState',
  default: '',
})

export const clientsSearchedState = selector({
  key: 'clientsSearchedState',
  get: ({ get }) => {
    const textSearched = get(textSearchState)
    const clientResult = get(clientsResultState)

    if (textSearched.trim()) {
      return clientResult?.data?.filter(client => client.name.toLowerCase().includes(textSearched.toLowerCase())) ?? []
    }

    return clientResult?.data ?? []
  }
})
