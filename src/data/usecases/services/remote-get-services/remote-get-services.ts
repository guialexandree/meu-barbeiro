import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'
import { GetServices, GetServicesResult } from '@/domain/usecases'

export class RemoteGetServices implements GetServices {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<GetServicesResult>,
  ) {}

  async get(): Promise<GetServicesResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/services`,
      method: 'get',
    })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body as GetServicesResult
      default:
        throw new UnexpectedError()
    }
  }
}
