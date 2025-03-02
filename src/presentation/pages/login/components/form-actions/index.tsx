import React from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { Button, Icon, Slide, Stack } from '@mui/material'
import { authenticationValidation } from './validations'
import * as Factories from '@/main/factories/usecases'
import * as State from '@/presentation/pages/login/components/atoms'

export const FormActions: React.FC = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useRecoilState(State.usernameState)
  const [password, setPassword] = useRecoilState(State.passwordState)
  const [loading, setLoading] = useRecoilState(State.loadingLoginState)
  const resetUserName = useResetRecoilState(State.usernameState)
  const resetPassword = useResetRecoilState(State.passwordState)

  const authenticationUseCase = React.useMemo(() => Factories.makeRemoteAuthentication(), [])

  const onSuccess = () => {
    navigate('/')
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
    <Stack spacing={3} width='100%'>
      <Slide direction="left" timeout={300} in mountOnEnter unmountOnExit>
        <Button
          loading={loading}
          fullWidth
          disabled={!!username.error || !!password.error || loading}
          id="login-button"
          type="submit"
          variant="contained"
          size="large"
          onClick={handleLogin}
          endIcon={<Icon>login</Icon>}
        >
          Entrar
        </Button>
      </Slide>
      <Slide direction="right" timeout={300} in mountOnEnter unmountOnExit>
        <Button
          size="small"
          disabled={loading}
          id="recovery-password-button"
          color="primary"
          onClick={() => { navigate('/login/esqueci-minha-senha') }}
        >
          Esqueci minha senha
        </Button>
      </Slide>
    </Stack>
  )
}
