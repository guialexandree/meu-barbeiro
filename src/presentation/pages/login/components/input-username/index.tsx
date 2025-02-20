import React from 'react'
import { useRecoilValue } from 'recoil'
import { InputText } from '@/presentation/components'
import * as State from '@/presentation/pages/login/components/atoms'

export const InputUsername: React.FC = () => {
  const username = useRecoilValue(State.usernameState)
  const loading = useRecoilValue(State.loadingLoginState)

  return (
    <InputText
      state={State.usernameState}
      inputProps={{
        name: 'user',
        disabled: loading,
        id: 'login-user',
        label: 'Usuário',
        fullWidth: true,
        error: !!username.error,
        helperText: username.error,
      }}
    />
  )
}

