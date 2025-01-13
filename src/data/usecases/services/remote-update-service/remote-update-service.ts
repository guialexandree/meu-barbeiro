import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'
import { UpdateService, UpdateServiceParams, UpdateServiceResult } from '@/domain/usecases'

export class RemoteUpdateService implements UpdateService {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<UpdateServiceResult>,
  ) {}

  async update(params: UpdateServiceParams): Promise<UpdateServiceResult> {
    const { id, ...reqParams } = params

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/services/${id}`,
      method: 'patch',
      body: reqParams,
    })

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body as UpdateServiceResult
      default:
        throw new UnexpectedError()
    }
  }
}
