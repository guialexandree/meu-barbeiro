import React from 'react'
import { useRecoilState } from 'recoil'
import { Alert, Icon, IconButton, Zoom } from '@mui/material'
import { State } from '@/presentation/pages/user-form/components/atoms'

export const ErrorPanel: React.FC = () => {
  const [formError, setFormError] = useRecoilState(State.errorFormState)

  if (!formError) {
    return undefined
  }

  return (
    <Zoom in timeout={500}>
      <Alert id='client-form-error-panel' severity="error" variant="filled" sx={{ position: 'relative', boxShadow: 1 }}>
        {formError}{' '}
        <IconButton
          onClick={() => {
            setFormError('')
          }}
          sx={{ position: 'absolute', right: 0, top: 0 }}
        >
          <Icon fontSize="small">close</Icon>
        </IconButton>
      </Alert>
    </Zoom>
  )
}
