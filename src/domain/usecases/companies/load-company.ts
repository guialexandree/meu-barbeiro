import { CompanyModel } from '@/domain/models'
import { HttpDefaultResponse } from '@/data/protocols'

export interface LoadCompany {
  load: () => Promise<LoadCompanyResult>
}

export type LoadCompanyResult = HttpDefaultResponse<CompanyModel>
