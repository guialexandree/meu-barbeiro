import { ServiceModel } from '@/domain/models'
import { atom, selector } from 'recoil'

export const servicesSearchState = atom({
  key: 'servicesSearchState',
  default: '',
})

export const servicesState = atom<ServiceModel[]>({
  key: 'servicesState',
  default: [],
})

export const servicesSearchedState = selector({
  key: 'servicesSearchedState',
  get: ({ get }) => {
    const textSearched = get(servicesSearchState)
    const services = get(servicesState)

    if (textSearched.trim()) {
      return services?.filter(service => service.name.toLowerCase().includes(textSearched.toLowerCase())) ?? []
    }

    return services
  },
})
