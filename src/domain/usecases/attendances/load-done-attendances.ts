import { HttpDefaultResponse } from '@/data/protocols'
import { AttendanceDone } from '@/domain/models'

export interface LoadDoneAttendances {
  load: () => Promise<LoadDoneAttendancesResult>
}

export type LoadDoneAttendancesResult = HttpDefaultResponse<AttendanceDone[]>
