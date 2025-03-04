import { HttpDefaultResponse } from '@/data/protocols'
import { AlertModel } from '@/domain/models'

export interface LoadAlerts {
  load: () => Promise<LoadAlertsResult>
}

export type LoadAlertsResult = HttpDefaultResponse<AlertModel[]>
