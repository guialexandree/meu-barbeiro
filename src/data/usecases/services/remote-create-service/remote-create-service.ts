import { CreateService, CreateServiceParams, CreateServiceResult } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'
import { _mockServices } from '@/domain/tests'

export class RemoteCreateService implements CreateService {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<CreateServiceResult>,
  ) {}

  async create(params: CreateServiceParams): Promise<CreateServiceResult> {
    return _mockServices
    // const { statusCode, body } = await this.httpClient.request({
    //   url: `${this.url}/services`,
    //   method: 'post',
    //   body: params
    // })

    // switch (statusCode) {
    //   case HttpStatusCode.created:
    //     if (!body) {
    //       throw new UnexpectedError()
    //     }
    //     return body
    //   default:
    //     throw new UnexpectedError()
    // }
  }
}
