import { HttpDefaultResponse } from '@/data/protocols'
import { ServiceModel } from '@/domain/models'

export type UpdateServiceParams = ServiceModel

export type UpdateServiceResult = HttpDefaultResponse<ServiceModel>

export interface UpdateService {
  update: (params: UpdateServiceParams) => Promise<UpdateServiceResult>
}
