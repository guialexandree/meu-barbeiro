import React from 'react'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { DeleteFormAction, SaveFormAction, UpdateFormAction } from '@/presentation/pages/service-form/components'
import { CancelAction, FormActions } from '@/presentation/components'
import { State } from '../atoms'

export const Actions: React.FC = () => {
  const navigate = useNavigate()
  const service = useRecoilValue(State.serviceResultState)

  const handleGoBackToList = React.useCallback(() => {
    navigate('/servicos')
  }, [])

  return (
    <FormActions>
      <DeleteFormAction service={service} />
      <CancelAction fullWidth onCancel={handleGoBackToList} enterDelay={250} />
      <UpdateFormAction />
      <SaveFormAction />
    </FormActions>
  )
}
