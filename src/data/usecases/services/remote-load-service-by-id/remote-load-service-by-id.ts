import { LoadServiceById, LoadServiceByIdResult, LoodServiceByIdParams } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadServiceById implements LoadServiceById {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadServiceByIdResult>) {}

  async load(params: LoodServiceByIdParams): Promise<LoadServiceByIdResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/services/${params.id}`,
      method: 'get',
    })

    if (import.meta.env.DEV) {
      // return new Promise<LoadServiceByIdResult>((resolve) => {
      //   setTimeout(() => resolve(_mockLoadServiceByIdResult), 1500)
      // })
    }

    if (statusCode === HttpStatusCode.unauthorized) {
      throw new AccessDeniedError()
    }

    if (!body?.data) {
      throw new UnexpectedError()
    }

    return body
  }
}
