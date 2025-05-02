import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AddAttendanceInQueue, AddAttendanceInQueueParams, AddAttendanceInQueueResult } from '@/domain/usecases'

export class RemoteAddAttendanceInQueue implements AddAttendanceInQueue {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<AddAttendanceInQueueResult>) {}

  async add (params: AddAttendanceInQueueParams): Promise<AddAttendanceInQueueResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/attendances`,
      method: 'post',
      body: params
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
