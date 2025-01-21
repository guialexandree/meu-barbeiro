import { ServiceModel } from '@/domain/models'

export type RemoveServiceParams = {
  id: string
}

export type RemoveServiceResult = ServiceModel

export interface RemoveService {
  remove: (params: RemoveServiceParams) => Promise<RemoveServiceResult>
}
