import React from 'react'
import { Grid2 } from '@mui/material'
import { PageContainer } from '@/presentation/components'

const UserFormPage: React.FC = () => {
  return (
    <PageContainer
      title="Entrar na fila"
      subtitle="Crie clientes ou barbeiros para utilizar o app"
    >
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 6 }} sx={{ mx: { xs: 2, sm: 4 } }}>

        </Grid2>
        <Grid2 size={{ xs: 12 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
          // imagem para exibir na web
        </Grid2>
      </Grid2>
    </PageContainer>
  )
}

export default UserFormPage
