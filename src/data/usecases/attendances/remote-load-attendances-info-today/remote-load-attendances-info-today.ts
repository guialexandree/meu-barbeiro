import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadAttendancesInfoToday, LoadAttendancesInfoTodayResult } from '@/domain/usecases'

export class RemoteLoadAttendancesInfoToday implements LoadAttendancesInfoToday {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadAttendancesInfoTodayResult>) {}

  async load(): Promise<LoadAttendancesInfoTodayResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/attendances/info`,
      method: 'get',
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
