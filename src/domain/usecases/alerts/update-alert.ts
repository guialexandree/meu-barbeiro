import { AlertModel } from '@/domain/models'

export interface UpdateAlert {
  update: (params: UpdateAlertParams) => Promise<UpdateAlertResult>
}

export type UpdateAlertParams = AlertModel
export type UpdateAlertResult = AlertModel