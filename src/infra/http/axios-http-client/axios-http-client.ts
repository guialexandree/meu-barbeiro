import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols'
import axios, { AxiosError, AxiosResponse } from 'axios'

export class AxiosAdapter implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        params: data.params,
        headers: data.headers,
      })
      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      }
    } catch (error: unknown) {
      return {
        statusCode: (error as AxiosError).response?.status || 400,
        body: (error as AxiosError).response?.data || (error as Error).message,
      }
    }
  }
}
