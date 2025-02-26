import React from 'react'
import { Slide, Stack, Typography } from '@mui/material'
import { FormActions, InputAuthCode } from '@/presentation/pages/recovery-password/components'

const RecoveryPasswordPage: React.FC = () => {
  return (
    <Stack
      onSubmit={(event) => {
        event.preventDefault()
      }}
      component="form"
      sx={{ width: { xs: '80%', sm: '70%' }, minWidth: 180, mt: 4 }}
      marginX={'auto'}
      spacing={2}
    >
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Typography variant="h6">Informe o número de celular para receber o código de login</Typography>
      </Slide>

      <InputAuthCode />
      <FormActions />
    </Stack>
  )
}

export default RecoveryPasswordPage
