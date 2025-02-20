import { HttpDefaultResponse } from '@/data/protocols'
import { ServiceModel } from '@/domain/models'

export interface CreateService {
  create: (params: CreateServiceParams) => Promise<CreateServiceResult>
}

export type CreateServiceParams = Omit<ServiceModel, 'id'>
export type CreateServiceResult = HttpDefaultResponse<ServiceModel>
