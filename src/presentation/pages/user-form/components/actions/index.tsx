import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SaveAction, UpdateFormAction } from '@/presentation/pages/user-form/components'
import { CancelAction, FormActions } from '@/presentation/components'

export const Actions: React.FC = () => {
  const navigate = useNavigate()

  const handleGoBackToList = React.useCallback(() => {
    navigate('/')
  }, [])

  return (
    <FormActions>
      <CancelAction fullWidth onCancel={handleGoBackToList} enterDelay={250} />
      <UpdateFormAction />
      <SaveAction />
    </FormActions>
  )
}
