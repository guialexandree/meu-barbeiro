import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SaveFormAction } from '@/presentation/pages/attendance-form/components'
import { CancelAction, FormActions } from '@/presentation/components'
import { useResetRecoilState } from 'recoil'
import { State } from '../atoms'

export const Actions: React.FC = () => {
  const navigate = useNavigate()
  const resetUser = useResetRecoilState(State.selectedUserState)
  const resetServices = useResetRecoilState(State.selectedServicesState)
  const resetPosition = useResetRecoilState(State.positionState)

  const onReset = React.useCallback((): void => {
    resetUser()
    resetServices()
    resetPosition()
  }, [])

  const handleGoBackToList = React.useCallback(() => {
    navigate('/')
    onReset()
  }, [])

  return (
    <FormActions>
      <CancelAction fullWidth onCancel={handleGoBackToList} enterDelay={250} />
      <SaveFormAction onReset={onReset} />
    </FormActions>
  )
}
