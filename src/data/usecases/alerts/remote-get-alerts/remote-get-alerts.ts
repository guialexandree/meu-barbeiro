import { GetAlerts, GetAlertsResult } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'
import { _mockAlerts } from '@/domain/tests'

export class RemoteGetAlerts implements GetAlerts {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<GetAlertsResult>,
  ) {}

  async get(): Promise<GetAlertsResult> {
    return _mockAlerts
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
