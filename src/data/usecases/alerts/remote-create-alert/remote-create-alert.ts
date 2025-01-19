import { UnexpectedError } from '@/domain/errors'
import { CreateAlert, CreateAlertParams, CreateAlertResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteCreateAlert implements CreateAlert {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<CreateAlertResult>,
  ) {}

  async create(params: CreateAlertParams): Promise<CreateAlertResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/alerts`,
      method: 'post',
      body: params
    })

    switch (statusCode) {
      case HttpStatusCode.created:
        if (!body) {
          throw new UnexpectedError()
        }
        return body
      default:
        throw new UnexpectedError()
    }
  }
}
