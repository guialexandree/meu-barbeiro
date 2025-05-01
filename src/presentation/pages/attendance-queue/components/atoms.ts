import { atom } from 'recoil'
import * as List from './list/atoms'

const openDialog = atom({
  key: 'openChangeStatusDialogState',
  default: false,
})

const expandHistoryState = atom({
  key: 'expandHistoryState',
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
  openDialog,
  expandHistoryState
}
