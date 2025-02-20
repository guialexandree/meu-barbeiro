import React from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { Button, Icon, Stack } from '@mui/material'
import { authenticationValidation } from './validations'
import * as Factories from '@/main/factories/usecases'
import * as State from '@/presentation/pages/login/components/atoms'

export const FormActions: React.FC = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useRecoilState(State.usernameState)
  const [password, setPassword] = useRecoilState(State.passwordState)
  const [loading, setLoading] = useRecoilState(State.loadingLoginState)
  const setOpenRecoveryPassword = useSetRecoilState(State.openRecoveryPasswordState)
  const resetUserName = useResetRecoilState(State.usernameState)
  const resetPassword = useResetRecoilState(State.passwordState)

  const authenticationUseCase = React.useMemo(() => Factories.makeRemoteAuthentication(), [])

  const onSuccess = () => {
    navigate('/fila-atendimento')
    resetUserName()
    resetPassword()
  }

  const onError = (error: Error) => {
    setPassword((currentState) => ({ ...currentState, error: error?.message || '' }))
  }

  const handleLogin = () => {
    const result = authenticationValidation.safeParse({ username: username.text, password: password.text })
    if (!result.success) {
      const error = result.error.errors.at(0)
      const inputName = Array.isArray(error?.path) ? error.path[0] : undefined
      if (!inputName) return

      const setError = {
        username: () => {
          setUsername((currentState) => ({ ...currentState, error: error?.message || '' }))
        },
        password: () => {
          setPassword((currentState) => ({ ...currentState, error: error?.message || '' }))
        },
      }[inputName]
      setError?.()
      return
    }

    setLoading(true)
    authenticationUseCase
      .login({
        username: username.text,
        password: password.text,
      })
      .then(onSuccess)
      .catch(onError)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Stack spacing={4}>
      <Button
        loading={loading}
        id="login-button"
        type="submit"
        variant="contained"
        size="large"
        onClick={handleLogin}
        endIcon={<Icon>login</Icon>}
      >
        Entrar
      </Button>
      <Button
        disabled={loading}
        size="small"
        id="recovery-password-button"
        color="inherit"
        sx={{ color: 'grey.600' }}
        onClick={() => {
          setOpenRecoveryPassword(true)
        }}
      >
        Esqueci minha senha
      </Button>
    </Stack>
  )
}
