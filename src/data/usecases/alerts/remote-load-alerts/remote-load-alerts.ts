import { LoadAlerts, LoadAlertsResult } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadAlerts implements LoadAlerts {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadAlertsResult>) {}

  async get(): Promise<LoadAlertsResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/alerts`,
      method: 'get',
    })

    if (process.env.NODE_ENV !== 'development') {
      // return new Promise<LoadServicesResult>((resolve) => {
      //   setTimeout(() => resolve(_mockServices), 1500)
      // })
    }

    if (statusCode === HttpStatusCode.unauthorized) {
      throw new AccessDeniedError()
    }

    if (!body) {
      throw new UnexpectedError()
    }

    return body
  }
}
