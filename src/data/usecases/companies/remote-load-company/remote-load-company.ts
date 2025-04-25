import { LoadCompany, LoadCompanyResult  } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteLoadCompany implements LoadCompany {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadCompanyResult>) {}

  async load(): Promise<LoadCompanyResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/barber-shop`,
      method: 'get',
    })

    if (import.meta.env.DEV) {
      // return new Promise<LoadCompanyResult>((resolve) => {
      //   setTimeout(() => resolve(_mockLoadCompanyResult), 1500)
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
