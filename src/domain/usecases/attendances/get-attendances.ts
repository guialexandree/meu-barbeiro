import { AttendanceModel } from '@/domain/models'

export interface LoadAttendances {
  get: () => Promise<LoadAttendancesResult>
}

export type LoadAttendancesResult = AttendanceModel[]
