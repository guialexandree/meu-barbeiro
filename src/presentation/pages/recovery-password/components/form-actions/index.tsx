import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Button, Icon, Slide, Stack } from '@mui/material'
import * as State from '@/presentation/pages/recovery-password/components/atoms'

export const FormActions: React.FC = () => {
  const navigate = useNavigate()
  const [authCode] = useRecoilState(State.authCodeState)
  const [loading] = useRecoilState(State.loadingRecoveryPasswordState)

  return (
    <Stack spacing={3}>
      <Slide direction="left" timeout={300} in mountOnEnter unmountOnExit>
        <Button
          loading={loading}
          disabled={!!authCode.error || loading}
          id="login-button"
          type="submit"
          variant="contained"
          size="large"
          onClick={() => {}}
          endIcon={<Icon>login</Icon>}
        >
          Enviar
        </Button>
      </Slide>
      <Slide direction="right" timeout={300} in mountOnEnter unmountOnExit>
        <Button
          size="small"
          disabled={loading}
          id="recovery-password-button"
          color="primary"
          onClick={() => {
            navigate('/login')
          }}
        >
          Voltar
        </Button>
      </Slide>
    </Stack>
  )
}
