import { UserTotalizer } from '@/domain/models'
import { HttpDefaultResponse } from '@/data/protocols'

export interface LoadUsersTotalizer {
  load: () => Promise<LoadUsersTotalizerResult>
}

export type LoadUsersTotalizerResult = HttpDefaultResponse<UserTotalizer>
