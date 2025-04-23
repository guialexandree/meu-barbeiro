import { atom } from 'recoil'

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
}
