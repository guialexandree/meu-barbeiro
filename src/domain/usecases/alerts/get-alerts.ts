import { AlertModel } from '@/domain/models'

export interface GetAlerts {
  get: () => Promise<GetAlertsResult>
}

export type GetAlertsResult = AlertModel[]
