import { atom } from 'recoil'
import { ServiceModel } from '@/domain/models'

export const isLoadingState = atom({
  key: 'isLoadingServiceState',
  default: false,
})

export const servicesState = atom<ServiceModel[]>({
  key: 'servicesState',
  default: [],
})

export const errorServicesState = atom({
  key: 'errorServicesState',
  default: '',
})

export * from './create-update-service-form/atoms'
