import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { CancelAttendance, CancelAttendanceParams, CancelAttendanceResult } from '@/domain/usecases'

export class RemoteCancelAttendance implements CancelAttendance {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<CancelAttendanceResult>) {}

  async cancel (params: CancelAttendanceParams): Promise<CancelAttendanceResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/attendances/${params.attendanceId}/cancel`,
      method: 'post',
      body: {
        id: params.attendanceId,
        reason: params.reason,
      },
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
