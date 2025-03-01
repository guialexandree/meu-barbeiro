import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { UpdateService, UpdateServiceParams, UpdateServiceResult } from '@/domain/usecases'

export class RemoteUpdateService implements UpdateService {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<UpdateServiceResult>) {}

  async update(params: UpdateServiceParams): Promise<UpdateServiceResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/services/${params.id}`,
      method: 'patch',
      body: params,
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
