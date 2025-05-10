import React from 'react'
import { SocketAdapter } from '@/infra'

const useSocket = () => {
  const getSocket = React.useCallback(() => {
    const socket = SocketAdapter.getInstance()
    return socket
  }, [])

  return { getSocket }
}

export default useSocket
