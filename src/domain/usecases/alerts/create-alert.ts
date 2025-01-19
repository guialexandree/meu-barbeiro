import { AlertModel } from '@/domain/models'

export interface CreateAlert {
  create: (params: CreateAlertParams) => Promise<CreateAlertResult>
}

export type CreateAlertResult = AlertModel

export type CreateAlertParams = Omit<AlertModel, 'id'> & {
  id?: string
}
