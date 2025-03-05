import { HttpDefaultResponse } from '@/data/protocols'
import { ServiceModel } from '@/domain/models'

export interface LoadServiceById {
  load: (params: LoodServiceByIdParams) => Promise<LoadServiceByIdResult>
}

export type LoodServiceByIdParams = {
  id: string
}
export type LoadServiceByIdResult = HttpDefaultResponse<ServiceModel>
