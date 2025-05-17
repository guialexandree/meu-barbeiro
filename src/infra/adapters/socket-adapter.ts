import { io, Socket } from 'socket.io-client'
import { SocketActionsAdapter } from './socket-actions-adapter'

export class SocketAdapter {
  private static instance: Socket
  private static actions: SocketActionsAdapter

  private constructor() {}

  public static getActions() {
    return SocketAdapter.actions
  }

  public static getInstance(): Socket {
    if (!SocketAdapter.instance) {
      SocketAdapter.actions = new SocketActionsAdapter()

      // SocketAdapter.instance = io(process.env.API_URL, {
      //   transports: ['websocket']
      // })

      // SocketAdapter.instance.on('connect', () => {
      //   console.log('Socket connected')
      // })
      // SocketAdapter.instance.on('disconnect', () => {
      //   console.log('Socket disconnected')
      // })
    }

    return SocketAdapter.instance
  }
}