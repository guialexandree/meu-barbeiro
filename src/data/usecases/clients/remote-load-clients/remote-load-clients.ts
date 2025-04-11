import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadClients, LoadClientsParams, LoadClientsResult } from '@/domain/usecases'

export class RemoteGetClients implements LoadClients {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadClientsResult>) {}

  async load (params?: LoadClientsParams): Promise<LoadClientsResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/users`,
      method: 'get',
      params,
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
