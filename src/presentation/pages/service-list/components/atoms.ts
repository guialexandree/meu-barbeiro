import { atom } from 'recoil'

const loadingServicesState = atom({
  key: 'loadingServicesState',
  default: true,
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
  noResultsServicesState,
  errorServicesState,
  List
}