import { HttpDefaultResponse } from '@/data/protocols'
import { SimpleUser } from '@/domain/models'

export interface LoadAvailablesUsers {
  load: () => Promise<LoadAvailablesUsersResult>
}

export type LoadAvailablesUsersResult = HttpDefaultResponse<SimpleUser[]>

