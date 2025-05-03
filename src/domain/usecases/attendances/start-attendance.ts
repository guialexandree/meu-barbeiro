import { AttendanceModel } from '@/domain/models'
import { HttpDefaultResponse } from '@/data/protocols'

export interface StartAttendance {
  start: (params: StartAttendanceParams) => Promise<StartAttendanceResult>
}

export type StartAttendanceParams = {
  attendanceId: string
}
export type StartAttendanceResult = HttpDefaultResponse<AttendanceModel>
