import { CreateAlert, CreateAlertParams, CreateAlertResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteCreateAlert implements CreateAlert {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<CreateAlertResult>) {}

  async create(params: CreateAlertParams): Promise<CreateAlertResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/alerts`,
      method: 'post',
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
