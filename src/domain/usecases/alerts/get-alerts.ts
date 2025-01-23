import { AlertModel } from '@/domain/models'

export interface LoadAlerts {
  get: () => Promise<LoadAlertsResult>
}

export type LoadAlertsResult = AlertModel[]
