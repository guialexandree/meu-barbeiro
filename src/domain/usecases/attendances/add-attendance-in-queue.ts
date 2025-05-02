import { AttendanceModel } from '@/domain/models'
import { HttpDefaultResponse } from '@/data/protocols'

export interface AddAttendanceInQueue {
  add: (params: AddAttendanceInQueueParams) => Promise<AddAttendanceInQueueResult>
}

export type AddAttendanceInQueueParams = {
  userId: string
  services: string[]
  position: 'last' | 'first'
}
export type AddAttendanceInQueueResult = HttpDefaultResponse<AttendanceModel>
