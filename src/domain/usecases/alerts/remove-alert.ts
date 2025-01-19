import { AlertModel } from '@/domain/models'

export interface RemoveAlert {
  remove: (params: RemoveAlertParams) => Promise<RemoveAlertResult>
}

export type RemoveAlertParams = {
  id: string
}
export type RemoveAlertResult = AlertModel