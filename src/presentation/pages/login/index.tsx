import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Grid2,
  Icon,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useRecoilState } from 'recoil'
import {
  userState,
  passwordState,
} from '@/presentation/pages/login/components/atoms'

const LoginPage: React.FC = () => {
  const [user, setUser] = useRecoilState(userState)
  const [password, setPassword] = useRecoilState(passwordState)
  const navigate = useNavigate()

  return (
    <Grid2
      container
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'white',
      }}
    >
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: '100vh' }}
        >
          <Stack
            component="form"
            sx={{ width: { xs: '80%', sm: '50%' } }}
            margin={'auto'}
            spacing={2}
          >
            <Typography variant="h6">Login</Typography>
            <TextField
              id="login-user"
              label="Usuário"
              fullWidth
              value={user}
              onChange={(event) => {
                setUser(event.target.value)
              }}
            />
            <TextField
              id="login-password"
              label="Senha"
              type="password"
              fullWidth
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton slot="end">
                      <Icon>visibility</Icon>
                    </IconButton>
                  ),
                },
              }}
            />
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
