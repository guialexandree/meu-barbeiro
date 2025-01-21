import { LoadServices, LoadServicesResult } from '@/domain/usecases'
import { HttpClient } from '@/data/protocols'
import { _mockServices } from '@/domain/tests'

export class RemoteLoadServices implements LoadServices {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadServicesResult>) {}

  async load(): Promise<LoadServicesResult> {
    return _mockServices
    // const { statusCode, body } = await this.httpClient.request({
    //   url: `${this.url}/services`,
    //   method: 'get',
    // })

    // switch (statusCode) {
    //   case HttpStatusCode.ok:
    //     if (!body) {
    //       throw new UnexpectedError()
    //     }
    //     return body
    //   default:
    //     throw new UnexpectedError()
    // }
  }
}
