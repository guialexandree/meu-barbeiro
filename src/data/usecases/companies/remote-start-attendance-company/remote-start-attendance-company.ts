import { StartAttendanceCompany, StartAttendanceCompanyResult } from '@/domain/usecases'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteStartAttendanceCompany implements StartAttendanceCompany {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<StartAttendanceCompanyResult>) {}

  async start(): Promise<StartAttendanceCompanyResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/barber-shop/start`,
      method: 'post',
    })

    if (import.meta.env.DEV) {
      // return new Promise<StartResult>((resolve) => {
      //   setTimeout(() => resolve(_mockStartResult), 1500)
      // })
    }

    if (statusCode === HttpStatusCode.unauthorized) {
      throw new AccessDeniedError()
    }

    if (!body?.data) {
      throw new UnexpectedError()
    }

    return body
  }
}
