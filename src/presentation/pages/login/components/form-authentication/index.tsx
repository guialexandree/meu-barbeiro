import React from 'react'
import { Stack, Typography } from '@mui/material'
import { FormActions, InputPassword, InputUsername } from '@/presentation/pages/login/components'

export const FormAuthentication: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Stack
      onSubmit={handleSubmit}
      component="form"
      sx={{ width: { xs: '80%', sm: '70%' }, minWidth: 180 }}
      marginX={'auto'}
      spacing={2}
    >
      <Typography variant="h6">Login</Typography>

      <InputUsername />
      <InputPassword />
      <FormActions />
    </Stack>
  )
}
