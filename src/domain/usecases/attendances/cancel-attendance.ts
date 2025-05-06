import { AttendanceModel } from '@/domain/models'
import { HttpDefaultResponse } from '@/data/protocols'

export interface CancelAttendance {
  cancel: (params: CancelAttendanceParams) => Promise<CancelAttendanceResult>
}

export type CancelAttendanceParams = {
  attendanceId: string
  reason: string
}
export type CancelAttendanceResult = HttpDefaultResponse<AttendanceModel>
