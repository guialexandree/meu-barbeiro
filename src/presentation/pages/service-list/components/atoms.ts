import { atom } from 'recoil'

const loadingServicesState = atom({
  key: 'loadingServicesState',
  default: true,
})

const emptyServicesState = atom({
  key: 'emptyServicesState',
  default: false
})

const noResultsServicesState = atom({
  key: 'noResultsServicesState',
  default: false
})

const errorServicesState = atom({
  key: 'errorServicesState',
  default: '',
})

import * as List from './services-list/atoms'

export const State = {
  loadingServicesState,
  emptyServicesState,
  noResultsServicesState,
  errorServicesState,
  List
}