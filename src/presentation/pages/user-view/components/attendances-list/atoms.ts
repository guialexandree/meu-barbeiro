import { atom } from 'recoil'

export const noResultsState = atom({
  key: 'noResultsAttendancesByUserState',
  default: false,
})

export const errorState = atom({
  key: 'errorClientsAttendancesByUserState',
  default: '',
})
