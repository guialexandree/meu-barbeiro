import React from 'react'
import { useRecoilValue } from 'recoil'
import { InputText } from '@/presentation/components'
import * as State from '@/presentation/pages/recovery-password/components/atoms'

export const InputAuthCode: React.FC = () => {
  const authCode = useRecoilValue(State.authCodeState)
  const loading = useRecoilValue(State.loadingRecoveryPasswordState)

  return (
    <InputText
      state={State.authCodeState}
      inputProps={{
        name: 'user',
        variant: 'filled',
        disabled: loading,
        id: 'login-user',
        label: 'Usuário',
        fullWidth: true,
        error: !!authCode.error,
        helperText: authCode.error,
      }}
    />
  )
}
