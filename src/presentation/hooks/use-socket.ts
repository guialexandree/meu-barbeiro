import React from 'react'
import { SocketAdapter } from '@/infra'

const useSocket = () => {
  const getSocket = React.useCallback(() => {
    const socket = SocketAdapter.getInstance()

    return socket
  }, [])

  const getActions = React.useCallback(() => {
    const actions = SocketAdapter.getActions()

    return actions

  }, [])

  return { getSocket, getActions }
}

export default useSocket
