import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { EndAttendance, EndAttendanceParams, EndAttendanceResult } from '@/domain/usecases'

export class RemoteEndAttendance implements EndAttendance {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<EndAttendanceResult>) {}

  async end (params: EndAttendanceParams): Promise<EndAttendanceResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/attendances/${params.attendanceId}/end`,
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
