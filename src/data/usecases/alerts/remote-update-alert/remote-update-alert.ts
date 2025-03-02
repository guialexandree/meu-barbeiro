import { UpdateAlert, UpdateAlertParams, UpdateAlertResult } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteUpdateAlert implements UpdateAlert {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<UpdateAlertResult>) {}

  async update(params: UpdateAlertParams): Promise<UpdateAlertResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/alerts/${params.id}`,
      method: 'patch',
      body: params,
    })

    if (process.env.NODE_ENV !== 'development') {
      // return new Promise<LoadServicesResult>((resolve) => {
      //   setTimeout(() => resolve(_mockAlerts), 1500)
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
