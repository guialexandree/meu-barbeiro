import { ServiceModel } from '@/domain/models'
import { HttpDefaultResponse } from '@/data/protocols'

export interface LoadDefaultService {
  load: () => Promise<LoadDefaultServiceResult>
}

export type LoadDefaultServiceResult = HttpDefaultResponse<ServiceModel>
