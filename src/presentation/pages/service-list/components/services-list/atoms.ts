import { ServiceModel, ServiceStatus } from '@/domain/models'
import { atom } from 'recoil'

export const servicesSearchState = atom({
  key: 'servicesSearchState',
  default: '',
})

export const showFilterState = atom({
  key: 'showFilterServicesState',
  default: true
})

export const statusFilterState = atom({
  key: 'statusServiceFilterState',
  default: 'todos' as ServiceStatus,
})

export const servicesState = atom<ServiceModel[]>({
  key: 'servicesState',
  default: [],
})

