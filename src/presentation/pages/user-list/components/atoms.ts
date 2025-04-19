import { atom } from 'recoil'
import * as List from './user-list/atoms'

const loadingClientsState = atom({
  key: 'loadingClientsState',
  default: true,
})

const noResultsClientsState = atom({
  key: 'noResultsClientsState',
  default: false,
})

const errorClientsState = atom({
  key: 'errorClientsState',
  default: '',
})

export const State = {
  loadingClientsState,
  noResultsClientsState,
  errorClientsState,
  List,
}
