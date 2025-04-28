import { LoadAttendancesResult } from '@/domain/usecases'
import { atom } from 'recoil'

export const loadingState = atom({
  key: 'loadingAttendancesState',
  default: false,
})

export const attendancesResultState = atom<LoadAttendancesResult>({
  key: 'attendancesState',
  default: null as unknown as LoadAttendancesResult,
})
