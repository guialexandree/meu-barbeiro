import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { RemoveService, RemoveServiceParams, RemoveServiceResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteRemoveService implements RemoveService {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<RemoveServiceResult>) {}

  async remove(params: RemoveServiceParams): Promise<RemoveServiceResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/services/${params.id}`,
      method: 'delete',
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
