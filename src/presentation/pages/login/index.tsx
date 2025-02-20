import React from 'react'
import { Box, Grid2, Stack } from '@mui/material'
import { FormAuthentication } from './components'
import logoImg from '@/presentation/assets/logo.png'

const LoginPage: React.FC = () => {
  return (
    <Grid2
      container
      sx={{
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.background.paper,
        color: 'white',
      }}
    >
      <Grid2 size={{ xs: 12, md: 4 }} sx={{ minWidth: 220 }}>
        <Stack justifyContent="flex-start" alignItems="center" sx={{ minHeight: '100vh' }} spacing={4} pt={4}>
          <Box component="img" src={logoImg} alt="Logo da barbearia" id="logo" height={180} />
          <FormAuthentication />
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
