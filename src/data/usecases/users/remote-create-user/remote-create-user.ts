import { CreateUser, CreateUserParams, CreateUserResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteCreateUser implements CreateUser {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<CreateUserResult>,
  ) {}

  async create(params: CreateUserParams): Promise<CreateUserResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/users`,
      method: 'post',
      body: params
    })

    if (import.meta.env.DEV) {
       // return new Promise<LoadClientsResult>((resolve) => {
      //   setTimeout(() => resolve(_mockClients), 1500)
      // })
    }

    if (statusCode === HttpStatusCode.unauthorized) {
      throw new AccessDeniedError()
    }

    if (!body || !body?.data) {
      throw new UnexpectedError()
    }

    return body
  }
}
