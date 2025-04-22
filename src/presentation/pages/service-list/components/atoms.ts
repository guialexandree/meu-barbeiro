import { atom } from 'recoil'

const listState = atom({
  key: 'listServicesState',
  default: {
    loading: true,
    noResults: false,
    error: ''
  },
})

import * as List from './services-list/atoms'

export const State = {
  listState,
  List
}