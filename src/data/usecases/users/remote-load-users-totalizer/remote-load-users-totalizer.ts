import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadUsersTotalizer, LoadUsersTotalizerResult } from '@/domain/usecases'

export class RemoteLoadUsersTotalizer implements LoadUsersTotalizer {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadUsersTotalizerResult>) {}

  async load (): Promise<LoadUsersTotalizerResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/users/totalizer`,
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
