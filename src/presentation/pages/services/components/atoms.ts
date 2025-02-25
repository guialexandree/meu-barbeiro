import { atom } from 'recoil'

export const loadingServicesState = atom({
  key: 'loadingServicesState',
  default: true,
})

export const emptyServicesState = atom({
  key: 'emptyServicesState',
  default: false
})

export const noResultsServicesState = atom({
  key: 'noResultsServicesState',
  default: false
})

export const errorServicesState = atom({
  key: 'errorServicesState',
  default: '',
})

export * from './create-update-service-form/atoms'
export * from './services-list/atoms'
