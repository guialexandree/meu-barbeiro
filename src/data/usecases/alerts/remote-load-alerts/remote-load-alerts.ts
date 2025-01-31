import { LoadAlerts, LoadAlertsResult } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'
import { _mockAlerts } from '@/domain/tests'

export class RemoteLoadAlerts implements LoadAlerts {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadAlertsResult>,
  ) {}

  async get(): Promise<LoadAlertsResult> {
    return new Promise<LoadAlertsResult>((resolve) => {
      setTimeout(() => resolve(_mockAlerts), 1500)
    })
    // const { statusCode, body } = await this.httpClient.request({
    //   url: `${this.url}/alerts`,
    //   method: 'get',
    // })

    // switch (statusCode) {
    //   case HttpStatusCode.ok:
    //     return body as GetAlertsResult
    //   default:
    //     throw new UnexpectedError()
    // }
  }
}
