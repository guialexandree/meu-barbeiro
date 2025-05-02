import { HttpDefaultResponse } from '@/data/protocols'

export interface LoadSimpleUsers {
  load: () => Promise<LoadSimpleUsersResult>
}

export type SimpleUser = {
  id: string
  name: string
}

export type LoadSimpleUsersResult = HttpDefaultResponse<SimpleUser[]>

