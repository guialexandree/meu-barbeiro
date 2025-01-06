import { Button, Grid2, Icon, IconButton, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const LoginPage: React.FC = () => {
  return (
    <Grid2 container sx={{ minHeight: '100vh' }}>
      <Grid2 size={{ xs: 12, md: 6 }} >
        <Stack justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
          <Stack component='form' maxWidth='50%' margin={'auto'} spacing={2}>
            <Typography variant='h6'>Login</Typography>
            <TextField
              id="login-user"
              label="Usuário"
            />
            <TextField
              id="login-password"
              label="Senha"
              type='password'
              sx={{ width: 280 }}
              slotProps={{
                input: {
                  endAdornment: <IconButton slot='end'>
                    <Icon>visibility</Icon>
                  </IconButton>
                }}
              }
            />
            <Button type='submit' variant='contained' size='large'>Entrar</Button>
          </Stack>

        </Stack>


      </Grid2>
      <Grid2
        sx={{
          display: { xs: 'none', sm: 'block'},
          backgroundColor: 'primary.main',
        }}
        size={{ md: 6 }}
      >

      </Grid2>
    </Grid2>
  )
}

export default LoginPage
