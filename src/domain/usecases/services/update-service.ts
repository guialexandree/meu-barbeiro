import { ServiceModel } from '@/domain/models'

export type UpdateServiceParams = ServiceModel

export type UpdateServiceResult = ServiceModel

export interface UpdateService {
  update: (params: UpdateServiceParams) => Promise<UpdateServiceResult>
}
