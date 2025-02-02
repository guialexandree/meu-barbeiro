import { atom } from 'recoil'

export const isLoadingState = atom({
  key: 'isLoadingServiceState',
  default: false,
})

export const errorServicesState = atom({
  key: 'errorServicesState',
  default: '',
})

export * from './create-update-service-form/atoms'
export * from './services-list/atoms'
