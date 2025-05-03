import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { StartAttendance, StartAttendanceParams, StartAttendanceResult } from '@/domain/usecases'

export class RemoteStartAttendance implements StartAttendance {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<StartAttendanceResult>) {}

  async start (params: StartAttendanceParams): Promise<StartAttendanceResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/attendances/${params.attendanceId}/start`,
      method: 'post',
    })

    if (import.meta.env.DEV) {
      // return new Promise<LoadServicesResult>((resolve) => {
      //   setTimeout(() => resolve(_mockClients), 1500)
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
