import { RemoveAlert, RemoveAlertParams, RemoveAlertResult } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteRemoveAlert implements RemoveAlert {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<RemoveAlertResult>) {}

  async remove(params: RemoveAlertParams): Promise<RemoveAlertResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/alerts/${params.id}`,
      method: 'delete',
      body: params,
    })

    if (import.meta.env.DEV) {
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
