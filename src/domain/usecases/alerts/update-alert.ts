import { HttpDefaultResponse } from '@/data/protocols'
import { AlertModel } from '@/domain/models'

export interface UpdateAlert {
  update: (params: UpdateAlertParams) => Promise<UpdateAlertResult>
}

export type UpdateAlertParams = AlertModel
export type UpdateAlertResult = HttpDefaultResponse<AlertModel>
