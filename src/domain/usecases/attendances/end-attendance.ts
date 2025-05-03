import { AttendanceModel } from '@/domain/models'
import { HttpDefaultResponse } from '@/data/protocols'

export interface EndAttendance {
  end: (params: EndAttendanceParams) => Promise<EndAttendanceResult>
}

export type EndAttendanceParams = {
  attendanceId: string
}
export type EndAttendanceResult = HttpDefaultResponse<AttendanceModel>
