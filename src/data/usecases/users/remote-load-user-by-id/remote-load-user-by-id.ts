import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, NotfoundError, UnexpectedError } from '@/domain/errors'
import { LoadUserById, LoadUserByIdParams, LoadUserByIdResult } from '@/domain/usecases'

export class RemoteLoadUserById implements LoadUserById {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadUserByIdResult>) {}

  async load(params: LoadUserByIdParams): Promise<LoadUserByIdResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/users/${params.id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.unauthorized) {
      throw new AccessDeniedError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotfoundError('Nenhum usuário foi encontrado com id informado')
    }

    if (!body?.data) {
      throw new UnexpectedError()
    }

    return body
  }
}
