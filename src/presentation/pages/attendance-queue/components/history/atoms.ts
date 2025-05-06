import { atom } from 'recoil'
import { AttendanceDone } from '@/domain/models'

export const loadingState = atom({
  key: 'loadingDoneAttendancesState',
  default: false,
})

export const doneAttendancesState = atom<AttendanceDone[]>({
  key: 'doneAttendancesState',
  default: [],
})
