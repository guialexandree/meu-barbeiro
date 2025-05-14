import { AttendanceModel } from '@/domain/models'
import { HttpDefaultResponse } from '@/data/protocols'

export interface ReAddAttendanceInQueue {
  reAdd: (params: ReAddAttendanceInQueueParams) => Promise<ReAddAttendanceInQueueResult>
}

export type ReAddAttendanceInQueueParams = {
  id: string
  position: 'last' | 'first'
}
export type ReAddAttendanceInQueueResult = HttpDefaultResponse<AttendanceModel>
