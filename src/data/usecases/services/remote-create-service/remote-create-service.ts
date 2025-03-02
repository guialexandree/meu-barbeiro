import { CreateService, CreateServiceParams, CreateServiceResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteCreateService implements CreateService {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<CreateServiceResult>,
  ) {}

  async create(params: CreateServiceParams): Promise<CreateServiceResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/services`,
      method: 'post',
      body: params
    })

    if (import.meta.env.DEV) {
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
