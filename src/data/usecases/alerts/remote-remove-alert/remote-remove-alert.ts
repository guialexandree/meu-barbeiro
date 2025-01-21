import { RemoveAlert, RemoveAlertParams, RemoveAlertResult } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'
import { _mockAlerts } from '@/domain/tests'

export class RemoteRemoveAlert implements RemoveAlert {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoveAlertResult>,
  ) {}

  async remove(params: RemoveAlertParams): Promise<RemoveAlertResult> {
    return _mockAlerts[0]
    // const { statusCode, body } = await this.httpClient.request({
    //   url: `${this.url}/alerts/${params.id}`,
    //   method: 'delete'
    // })

    // switch (statusCode) {
    //   case HttpStatusCode.ok:
    //     if (!body) {
    //       throw new UnexpectedError()
    //     }
    //     body.message = ''
    //     return body
    //   default:
    //     throw new UnexpectedError()
    // }
  }
}
