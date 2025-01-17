import { UnexpectedError } from '@/domain/errors'
import { _mockAlerts } from '@/domain/tests'
import { GetAlerts, GetAlertsResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteGetAlerts implements GetAlerts {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<GetAlertsResult>,
  ) {}

  async get(): Promise<GetAlertsResult> {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/alerts`,
      method: 'get',
    })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return _mockAlerts as GetAlertsResult
      default:
        throw new UnexpectedError()
    }
  }
}
