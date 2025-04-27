import { ServiceModel, ServiceStatus } from '@/domain/models'
import { atom } from 'recoil'

export const textInputSearchState = atom({
  key: 'textInputSearchState',
  default: '',
})

export const textSearchState = atom({
  key: 'servicesTextSearchState',
  default: '',
})

export const showFilterState = atom({
  key: 'showFilterServicesState',
  default: false
})

export const statusFilterState = atom({
  key: 'statusServiceFilterState',
  default: 'todos' as ServiceStatus,
})

export const servicesState = atom<ServiceModel[]>({
  key: 'servicesState',
  default: [],
})

