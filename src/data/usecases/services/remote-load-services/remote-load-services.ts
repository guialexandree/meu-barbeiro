import { LoadServices, LoadServicesResult, LoodServicesParams } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadServices implements LoadServices {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadServicesResult>) {}

  async load(params: LoodServicesParams): Promise<LoadServicesResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/services`,
      method: 'get',
      params
    })

    if (import.meta.env.DEV) {
      // return new Promise<LoadServicesResult>((resolve) => {
      //   setTimeout(() => resolve(_mockLoadServicesResult), 1500)
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
