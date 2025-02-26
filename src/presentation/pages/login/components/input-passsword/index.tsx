import React from 'react'
import { useRecoilValue } from 'recoil'
import { InputText } from '@/presentation/components'
import * as State from '@/presentation/pages/login/components/atoms'

export const InputPassword: React.FC = () => {
  const password = useRecoilValue(State.passwordState)
  const loading = useRecoilValue(State.loadingLoginState)

  return (
    <InputText
      state={State.passwordState}
      toogleVisibility
      inputProps={{
        name: 'password',
        disabled: loading,
        variant: 'filled',
        id: 'login-password',
        label: 'Senha',
        type: 'password',
        fullWidth: true,
        error: !!password.error,
        helperText: password.error,
      }}
    />
  )
}
