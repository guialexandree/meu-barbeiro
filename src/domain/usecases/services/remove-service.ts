import { ServiceModel } from '@/domain/models'
import { HttpDefaultResponse } from '@/data/protocols'

export type RemoveServiceParams = {
  id: string
}

export type RemoveServiceResult = HttpDefaultResponse<ServiceModel>

export interface RemoveService {
  remove: (params: RemoveServiceParams) => Promise<RemoveServiceResult>
}
