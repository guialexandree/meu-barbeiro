import { atom } from 'recoil'
import * as List from './list/atoms'

const openChangeStatusDialogState = atom({
  key: 'openChangeStatusDialogState',
  default: false,
})

const loadingChangeStatusState = atom({
  key: 'loadingChangeStatusState',
  default: false,
})

const listState = atom({
  key: 'listAttendanceState',
  default: {
    loading: true,
    noResults: false,
    error: '',
  },
})

export const State = {
  List,
  listState,
  loadingChangeStatusState,
  openChangeStatusDialogState
}
