import { Authentication, AuthenticationParams, AuthenticationResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode, SetStorage } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AuthenticationResult>,
    private readonly setStorage: SetStorage,
  ) {}

  async login(params: AuthenticationParams): Promise<AuthenticationResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/auth`,
      method: 'post',
      body: params,
    })

    if (import.meta.env.DEV) {
     // return new Promise<AuthenticationResult>((resolve) => {    
      //   setTimeout(() => resolve(_mockAuthenticationResult), 1500)
      // })
    }

    if (statusCode === HttpStatusCode.unauthorized) {
      throw new AccessDeniedError()
    }

    if (!body?.data) {
      throw new UnexpectedError()
    }

    this.setStorage.set('accessToken', { accessToken: body.data.accessToken })

    return body
  }
}
