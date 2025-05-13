import { io, Socket } from 'socket.io-client'

export class SocketAdapter {
  private static instance: Socket

  private constructor() {}

  public static getInstance(): Socket {
    if (!SocketAdapter.instance) {
      SocketAdapter.instance = io(process.env.API_URL, {
        transports: ['websocket']
      })

      SocketAdapter.instance.on('connect', () => {
        console.log('Socket connected')
      })
      SocketAdapter.instance.on('disconnect', () => {
        console.log('Socket disconnected')
      })
    }
    return SocketAdapter.instance
  }
}