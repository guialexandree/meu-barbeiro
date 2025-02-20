import { HttpDefaultResponse } from '@/data/protocols'

export interface Authentication {
  login: (params: AuthenticationParams) => Promise<AuthenticationResult>
}

export type AuthenticationParams = {
  username: string
  password: string
}

export type AuthenticationResult = HttpDefaultResponse<{
  accessToken: string
}>
