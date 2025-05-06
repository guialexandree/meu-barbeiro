import { atom } from 'recoil'
import * as List from './list/atoms'
import * as History from './history/atoms'

const openDialogState = atom({
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
  History,
  listState,
  loadingChangeStatusState,
  openDialogState,
  expandHistoryState
}
