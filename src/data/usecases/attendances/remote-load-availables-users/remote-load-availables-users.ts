import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadAvailablesUsers, LoadAvailablesUsersResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadAvailablesUsers implements LoadAvailablesUsers {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadAvailablesUsersResult>) {}

  async load (): Promise<LoadAvailablesUsersResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/attendances/availables-users`,
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
