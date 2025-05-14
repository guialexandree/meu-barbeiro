import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { ReAddAttendanceInQueue, ReAddAttendanceInQueueParams, ReAddAttendanceInQueueResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/data/protocols'

export class RemoteReAddAttendanceInQueue implements ReAddAttendanceInQueue {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<ReAddAttendanceInQueueResult>) {}

  async reAdd (params: ReAddAttendanceInQueueParams): Promise<ReAddAttendanceInQueueResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/attendances/re-add`,
      method: 'post',
      body: params
    })

    if (statusCode === HttpStatusCode.unauthorized) {
      throw new AccessDeniedError()
    }

    if (!body?.data) {
      throw new UnexpectedError()
    }

    return body
  }
}
