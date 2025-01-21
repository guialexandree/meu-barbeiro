import { HttpClient } from '@/data/protocols'
import { _mockServices } from '@/domain/tests'
import { RemoveService, RemoveServiceParams, RemoveServiceResult } from '@/domain/usecases'

export class RemoteRemoveService implements RemoveService {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoveServiceResult>,
  ) {}

  async remove(params: RemoveServiceParams): Promise<RemoveServiceResult> {
    return _mockServices[0]
    // const { statusCode, body } = await this.httpClient.request({
    //   url: `${this.url}/services/${params.id}`,
    //   method: 'delete',
    // })

    // switch (statusCode) {
    //   case HttpStatusCode.ok:
    //     return body as RemoveServiceResult
    //   default:
    //     throw new UnexpectedError()
    // }
  }
}
