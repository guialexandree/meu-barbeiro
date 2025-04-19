import { HttpDefaultResponse } from '@/data/protocols'
import { AttendanceModel } from '@/domain/models'

export interface LoadAttendancesByUser {
  load: (params: LoadAttendancesByUserParams) => Promise<LoadAttendancesByUserResult>
}

export type LoadAttendancesByUserParams = {
  userId: string
}
export type LoadAttendancesByUserResult = HttpDefaultResponse<AttendanceModel[]>
