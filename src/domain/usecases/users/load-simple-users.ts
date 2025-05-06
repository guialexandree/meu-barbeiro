import { HttpDefaultResponse } from '@/data/protocols'
import { SimpleUser } from '@/domain/models'

export interface LoadSimpleUsers {
  load: () => Promise<LoadSimpleUsersResult>
}

export type LoadSimpleUsersResult = HttpDefaultResponse<SimpleUser[]>

