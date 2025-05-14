import { useRecoilState } from 'recoil'
import { GenericState } from '@/presentation/components/atoms'
import React from 'react'

export type Action = {
  type: 'inQueue' | 'cancel' | 'finished'
  attendanceId: string
}

const useActions = () => {
  const [actions, setActions] = useRecoilState(GenericState.actionsState)

  const addAction = (action: Action) => {
    setActions((currentState) => [...currentState, action])
  }

  const getAction =  React.useCallback((attendanceId: string, type: 'inQueue' | 'cancel' | 'finished') => {
    return actions.find((action) => action.attendanceId === attendanceId && action.type === type)
  }, [actions])

  const removeAction = (action: Action) => {
    setActions((currentState) => {
      const index = currentState.findIndex((a) => a.attendanceId === action.attendanceId && a.type === action.type)
      if (index !== -1) {
        return [...currentState.slice(0, index), ...currentState.slice(index + 1)]
      }
      return currentState
    })
  }

  return { addAction, getAction, removeAction }
}

export default useActions
