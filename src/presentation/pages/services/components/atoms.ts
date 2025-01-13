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

export * from './create-service-form/atoms'
export * from './update-service-form/atoms'
