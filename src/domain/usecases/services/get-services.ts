import { HttpDefaultResponse } from '@/data/protocols'
import { ServiceModel, ServiceStatus } from '@/domain/models'

export interface LoadServices {
  load: (params: LoodServicesParams) => Promise<LoadServicesResult>
}

export type LoodServicesParams = {
  search?: string
  status?: ServiceStatus
}
export type LoadServicesResult = HttpDefaultResponse<ServiceModel[]>
