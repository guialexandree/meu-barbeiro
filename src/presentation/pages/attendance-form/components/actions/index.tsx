import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SaveFormAction } from '@/presentation/pages/attendance-form/components'
import { CancelAction, FormActions } from '@/presentation/components'

export const Actions: React.FC = () => {
  const navigate = useNavigate()

  const handleGoBackToList = React.useCallback(() => {
    navigate('/clientes')
  }, [])

  return (
    <FormActions>
      <CancelAction fullWidth onCancel={handleGoBackToList} enterDelay={250} />
      <SaveFormAction />
    </FormActions>
  )
}
