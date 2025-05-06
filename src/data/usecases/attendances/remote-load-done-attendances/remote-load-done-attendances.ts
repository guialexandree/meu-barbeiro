import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadDoneAttendances, LoadDoneAttendancesResult } from '@/domain/usecases'

export class RemoteLoadDoneAttendances implements LoadDoneAttendances {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadDoneAttendancesResult>) {}

  async load (): Promise<LoadDoneAttendancesResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/attendances/done-today`,
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

    if (!body?.data || !Array.isArray(body.data)) {
      throw new UnexpectedError()
    }

    return body
  }
}
