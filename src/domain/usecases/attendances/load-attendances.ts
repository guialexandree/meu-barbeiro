import { HttpDefaultResponse } from '@/data/protocols'
import { AttendanceModel } from '@/domain/models'

export interface LoadAttendances {
  load: () => Promise<LoadAttendancesResult>
}

export type LoadAttendancesResult = HttpDefaultResponse<AttendanceModel[]>
