import { atom } from 'recoil'

const openChangeStatusDialogState = atom({
  key: 'openChangeStatusDialogState',
  default: false,
})

const loadingChangeStatusState = atom({
  key: 'loadingChangeStatusState',
  default: false,
})

const listState = atom({
  key: 'listUsersState',
  default: {
    loading: true,
    noResults: false,
    error: '',
  },
})

export const State = {
  listState,
  loadingChangeStatusState,
  openChangeStatusDialogState
}
