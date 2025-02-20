import { HttpDefaultResponse } from '@/data/protocols'
import { ServiceModel } from '@/domain/models'

export interface LoadServices {
  load: () => Promise<LoadServicesResult>
}

export type LoadServicesResult = HttpDefaultResponse<ServiceModel[]>
