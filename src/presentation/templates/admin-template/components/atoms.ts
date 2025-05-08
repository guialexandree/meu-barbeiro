import { atom } from 'recoil'
import { AttendanceTotal } from '@/domain/models'

const loadingState = atom({
  key: 'loadingAttendancesResultState',
  default: false
})

const attendancesInfoResultState = atom<AttendanceTotal>({
  key: 'attendancesInfoResultState',
  default: null as unknown as AttendanceTotal,
})

export const State = {
  loadingState,
  attendancesInfoResultState,
}