import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSimpleUsers, LoadSimpleUsersResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadSimpleUsers implements LoadSimpleUsers {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadSimpleUsersResult>) {}

  async load (): Promise<LoadSimpleUsersResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/users/simple`,
      method: 'get',
    })

    if (import.meta.env.DEV) {
      // return new Promise<LoadServicesResult>((resolve) => {
      //   setTimeout(() => resolve(_mockClients), 1500)
      // })
    }

    if (statusCode === HttpStatusCode.unauthorized) {
      throw new AccessDeniedError()
    }

    if (!body?.data) {
      throw new UnexpectedError()
    }

    return body
  }
}
