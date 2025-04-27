import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SaveFormAction, UpdateFormAction } from '@/presentation/pages/service-form/components'
import { CancelAction, FormActions } from '@/presentation/components'

export const Actions: React.FC = () => {
  const navigate = useNavigate()

  const handleGoBackToList = React.useCallback(() => {
    navigate('/servicos')
  }, [])

  return (
    <FormActions>
      <CancelAction fullWidth onCancel={handleGoBackToList} enterDelay={250} />
      <UpdateFormAction />
      <SaveFormAction />
    </FormActions>
  )
}
