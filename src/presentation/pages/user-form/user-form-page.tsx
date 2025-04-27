import React from 'react'
import { useRecoilValue } from 'recoil'
import { Grid2, Stack } from '@mui/material'
import { PageContainer } from '@/presentation/components'
import { Actions, TypeSwitch, SuccessPanel, ErrorPanel, Form, PermissionsPanel } from './components'
import { State } from '@/presentation/pages/user-form/components/atoms'

const UserFormPage: React.FC = () => {
  const formSuccess = useRecoilValue(State.successFormState)

  return (
    <PageContainer
      title="Cadastro de Cliente"
      subtitle="Crie clientes ou barbeiros para utilizar o app"
    >
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 6 }} sx={{ mx: { xs: 2, sm: 4 } }}>
          {formSuccess ? (
            <SuccessPanel />
          ) : (
            <Stack spacing={1} component='form' onSubmit={(event) => event.preventDefault()}>

              <TypeSwitch />
              <Form />
              <PermissionsPanel />

              <Actions />
              <ErrorPanel />
            </Stack>
          )}
        </Grid2>
        <Grid2 size={{ xs: 12 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
          // imagem para exibir na web
        </Grid2>
      </Grid2>
    </PageContainer>
  )
}

export default UserFormPage
