import { ServiceModel } from '@/domain/models'

export interface GetServices {
  get: () => Promise<GetServicesResult>
}

export type GetServicesResult = ServiceModel[]
