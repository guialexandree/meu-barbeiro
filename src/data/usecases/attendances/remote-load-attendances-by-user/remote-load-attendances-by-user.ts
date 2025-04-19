import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, NotfoundError, UnexpectedError } from '@/domain/errors'
import { LoadAttendancesByUser, LoadAttendancesByUserParams, LoadAttendancesByUserResult } from '@/domain/usecases'

export class RemoteLoadAttendancesByUser implements LoadAttendancesByUser {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadAttendancesByUserResult>) {}

  async load (params: LoadAttendancesByUserParams): Promise<LoadAttendancesByUserResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/attendances/user/${params.userId}`,
      method: 'get',
    })

    if (import.meta.env.DEV) {
      // return new Promise<LoadServicesResult>((resolve) => {
      //   setTimeout(() => resolve(_mockClients), 1500)
      // })
    }

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
