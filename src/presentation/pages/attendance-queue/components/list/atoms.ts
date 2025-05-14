import { LoadAttendancesResult } from '@/domain/usecases'
import { atom, selector } from 'recoil'

export const loadingState = atom({
  key: 'loadingAttendancesState',
  default: false,
})

export const attendancesResultState = atom<LoadAttendancesResult>({
  key: 'attendancesState',
  default: null as unknown as LoadAttendancesResult,
})

export const openDialogWhatsAppState = atom({
  key: 'openDialogWhatsAppState',
  default: false,
})

export const currentAttendanceState = selector({
  key: 'currentAttendanceState',
  get: ({ get }) => {
    const attendances = get(attendancesResultState)
    return attendances?.data?.[0] ?? null
  },
})