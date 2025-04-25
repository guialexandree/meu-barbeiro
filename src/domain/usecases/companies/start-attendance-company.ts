import { HttpDefaultResponse } from '@/data/protocols'
import { CompanyModel } from '@/domain/models'

export interface StartAttendanceCompany {
  start: () => Promise<StartAttendanceCompanyResult>
}

export type StartAttendanceCompanyResult = HttpDefaultResponse<CompanyModel>
