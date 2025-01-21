import { HttpClient } from '@/data/protocols'
import { _mockServices } from '@/domain/tests'
import { UpdateService, UpdateServiceParams, UpdateServiceResult } from '@/domain/usecases'

export class RemoteUpdateService implements UpdateService {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<UpdateServiceResult>,
  ) {}

  async update(params: UpdateServiceParams): Promise<UpdateServiceResult> {
    return _mockServices[0]
    // const { id, ...bodyParams } = params

    // const { statusCode, body } = await this.httpClient.request({
    //   url: `${this.url}/services/${id}`,
    //   method: 'patch',
    //   body: bodyParams,
    // })

    // switch (statusCode) {
    //   case HttpStatusCode.ok:
    //     return body as UpdateServiceResult
    //   default:
    //     throw new UnexpectedError()
    // }
  }
}
