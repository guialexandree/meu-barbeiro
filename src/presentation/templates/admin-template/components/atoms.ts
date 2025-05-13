import { atom } from 'recoil'
import { AttendanceTotal } from '@/domain/models'

const loadingState = atom({
  key: 'loadingAttendancesResultState',
  default: false
})

const attendancesInfoResultState = atom<AttendanceTotal>({
  key: 'attendancesInfoResultState',
  default: {
    amount: 0,
    finished: 0,
    inQueue: 0,
  },
})

export const State = {
  loadingState,
  attendancesInfoResultState,
}