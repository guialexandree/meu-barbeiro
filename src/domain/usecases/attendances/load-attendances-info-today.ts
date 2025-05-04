import { AttendanceTotal } from '@/domain/models'
import { HttpDefaultResponse } from '@/data/protocols'

export interface LoadAttendancesInfoToday {
  load: () => Promise<LoadAttendancesInfoTodayResult>
}

export type LoadAttendancesInfoTodayResult = HttpDefaultResponse<AttendanceTotal>
