import faker from 'faker'
import { AuthenticationParams, AuthenticationResult } from '@/domain/usecases'
import { AuthenticationModel } from '@/domain/models'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
})

export const mockAuthenticationResult = (): AuthenticationResult => ({
  success: true,
  message: faker.random.words(),
  data: {
    accessToken: faker.datatype.uuid(),
  },
  error: ''
})

export const mockAuthenticationModel = (): AuthenticationModel => ({
  name: faker.name.findName(),
  sub: faker.datatype.uuid(),
  username: faker.internet.userName(),
})
