import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadAttendancesByUser, LoadAttendancesByUserParams, LoadAttendancesByUserResult } from '@/domain/usecases'

export class RemoteLoadAttendancesByUser implements LoadAttendancesByUser {
  constructor(private readonly url: string, private readonly httpClient: HttpClient<LoadAttendancesByUserResult>) {}

  async load (params: LoadAttendancesByUserParams): Promise<LoadAttendancesByUserResult> {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/api/attendances/user/${params.userId}`,
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
