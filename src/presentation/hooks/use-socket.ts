import { SocketAdapter } from '@/infra'

const useSocket = () => {
  const getSocket = () => {
    const socket = SocketAdapter.getInstance()
    return socket
  }

  return { getSocket }
}

export default useSocket
