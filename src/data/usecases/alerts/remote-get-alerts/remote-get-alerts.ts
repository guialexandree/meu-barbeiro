import { UnexpectedError } from '@/domain/errors'
import { GetAlerts, GetAlertsResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteGetAlerts implements GetAlerts {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<GetAlertsResult>,
  ) {}

  async get(): Promise<GetAlertsResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/alerts`,
      method: 'get',
    })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body as GetAlertsResult
      default:
        throw new UnexpectedError()
    }
  }
}
