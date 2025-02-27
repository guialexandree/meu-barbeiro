import { AuthenticationParams, AuthenticationResult } from '@/domain/usecases'
import { AuthenticationModel } from '@/domain/models'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  username: 'any_username',
  password: 'any_password',
})

export const mockAuthenticationResult = (): AuthenticationResult => ({
  success: true,
  message: 'Success',
  data: {
    accessToken: 'any_token',
  },
  error: ''
})

export const mockAuthenticationModel = (): AuthenticationModel => ({
  name: 'any_name',
  sub: 'any_sub',
  username: 'any_username',
})
