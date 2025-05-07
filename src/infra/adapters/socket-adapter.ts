import { io, Socket } from 'socket.io-client'

export class SocketAdapter {
  private static instance: Socket

  private constructor() {}

  public static getInstance(): Socket {
    if (!SocketAdapter.instance) {
      SocketAdapter.instance = io(process.env.API_URL, {
        transports: ['websocket']
      })
    }
    return SocketAdapter.instance
  }
}