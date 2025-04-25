import { HttpDefaultResponse } from '@/data/protocols'
import { CompanyModel } from '@/domain/models'

export interface ClosedAttendanceCompany {
  closed: () => Promise<ClosedAttendanceCompanyResult>
}

export type ClosedAttendanceCompanyResult = HttpDefaultResponse<CompanyModel>
