import { atom } from 'recoil'
import * as List from './user-list/atoms'

const listState = atom({
  key: 'listUsersState',
  default: {
    loading: true,
    noResults: false,
    error: ''
  },
})

export const State = {
  listState,
  List,
}
