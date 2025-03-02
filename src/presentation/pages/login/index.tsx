import React from 'react'
import { Chip, Divider, Icon, Slide, Stack } from '@mui/material'
import { FormActions, InputPassword, InputUsername } from '@/presentation/pages/login/components'

const LoginPage: React.FC = () => {
  return (
    <Stack
      onSubmit={(event) => {
        event.preventDefault()
      }}
      component="form"
      sx={{ width: { xs: '80%', sm: '70%' }, minWidth: 180, mt: 4 }}
      marginX={'auto'}
      spacing={2}
      justifyContent='center'
      alignItems='center'
    >
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Chip id='title-page' sx={{ fontWeight: '600' }} icon={<Icon>lock_open</Icon>} label="PAINEL DO BARBEIRO" color="secondary" />
      </Slide>

      <InputUsername />
      <InputPassword />
      <FormActions />
      <Divider />
    </Stack>
  )
}

export default LoginPage
