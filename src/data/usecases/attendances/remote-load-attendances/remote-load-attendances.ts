import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, NotfoundError, UnexpectedError } from '@/domain/errors'
import { LoadAttendances, LoadAttendancesResult } from '@/domain/usecases'

export class RemoteLoadAttendances implements LoadAttendances {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadAttendancesResult>) {}

  async load (): Promise<LoadAttendancesResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/attendances`,
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

    if (!body?.data || !Array.isArray(body.data)) {
      throw new UnexpectedError()
    }

    return body
  }
}
