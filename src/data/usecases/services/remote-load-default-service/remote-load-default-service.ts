import { LoadDefaultService, LoadDefaultServiceResult } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadDefaultService implements LoadDefaultService {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadDefaultServiceResult>) {}

  async load(): Promise<LoadDefaultServiceResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/services/default`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.unauthorized) {
      throw new AccessDeniedError()
    }

    if (!body?.data) {
      throw new UnexpectedError()
    }

    return body
  }
}
