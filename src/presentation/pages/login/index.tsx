import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Grid2, Icon, Stack, Typography } from '@mui/material'
import { InputText } from '@/presentation/components'
import * as State from '@/presentation/pages/login/components/atoms'
import logoImg from '@/presentation/assets/logo.png'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Grid2
      container
      sx={{
        minHeight: '100vh',
        backgroundColor: theme => theme.palette.background.paper,
        color: 'white',
      }}
    >
      <Grid2 size={{ xs: 12, md: 4 }} sx={{ minWidth: 220}}>
        <Stack justifyContent="flex-start" alignItems="center" sx={{ minHeight: '100vh' }} spacing={4} pt={4}>
          <Box
            component='img'
            src={logoImg}
            alt='Logo'
            height={200}
          />
          <Stack component="form" sx={{ width: { xs: '80%', sm: '70%' }, minWidth: 180 }} marginX={'auto'} spacing={2}>
            <Typography variant="h6">Login</Typography>

            <InputText state={State.userState} inputProps={{ id: 'login-user', label: 'Usuário', fullWidth: true }} />

            <InputText state={State.passwordState} inputProps={{ id: 'login-password', label: 'Senha', type: 'password', fullWidth: true }} />

            <Button
              type="submit"
              variant="contained"
              size="large"
              onClick={() => {
                navigate('/fila-atendimento')
              }}
              endIcon={<Icon>login</Icon>}
            >
              Entrar
            </Button>
          </Stack>
        </Stack>
      </Grid2>
      <Grid2
        sx={{
          display: { xs: 'none', sm: 'block' },
          backgroundColor: 'primary.main',
        }}
        size={{ md: 8 }}
      ></Grid2>
    </Grid2>
  )
}

export default LoginPage
