import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { InputText } from '@/presentation/components'
import * as State from '@/presentation/pages/login/components/atoms'

export const InputUsername: React.FC = () => {
  const username = useRecoilValue(State.usernameState)
  const loading = useRecoilValue(State.loadingLoginState)
  const inputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (username.error) {
      inputRef.current?.focus()
    }
  },[username.error])

  return (
    <InputText
      state={State.usernameState}
      inputProps={{
        ref: inputRef,
        name: 'user',
        variant: 'filled',
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
