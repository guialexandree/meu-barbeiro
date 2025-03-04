import React from 'react'
import { useResetRecoilState } from 'recoil'
import { Grid2, Paper, Stack } from '@mui/material'
import { InputPrice, InputText, PageContainer } from '@/presentation/components'
import { ServiceFormRemoveAction, ServiceFormStatus, ServiceFormActions, ServiceFormTimeExecution } from './components'
import { State } from '@/presentation/pages/service-form/components/atoms'

const ServiceFormPage: React.FC = () => {
  const resetName = useResetRecoilState(State.nameState)
  const resetDescription = useResetRecoilState(State.descriptionState)
  const resetPrice = useResetRecoilState(State.priceState)
  const resetTimeExecution = useResetRecoilState(State.timeExecutionState)
  const resetStatus = useResetRecoilState(State.statusState)

  React.useEffect(() => {
    resetName()
    resetDescription()
    resetPrice()
    resetTimeExecution()
    resetStatus()
  }, [])

  return (
    <PageContainer
      title="Cadastro de Serviço"
      subtitle="Crie serviços e ajuste preços para serem exibidos no app do cliente"
    >
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Paper
            id="service-create-form"
            sx={{
              mx: { xs: 2, sm: 4 },
              p: 3,
              pb: 5,
            }}
          >
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <ServiceFormStatus />
                <ServiceFormRemoveAction />
              </Stack>

              <InputText
                state={State.nameState}
                inputProps={{
                  autoFocus: true,
                  inputMode: 'text',
                  label: 'Nome',
                  id: 'service-name',
                  name: 'name',
                }}
              />

              <InputText
                state={State.descriptionState}
                inputProps={{
                  inputMode: 'text',
                  label: 'Descrição',
                  id: 'service-description',
                  name: 'description',
                }}
              />

              <InputPrice
                state={State.priceState}
                inputProps={{
                  inputMode: 'decimal',
                  label: 'Preço',
                  id: 'service-price',
                  name: 'price',
                }}
              />

              <ServiceFormTimeExecution />
            </Stack>
          </Paper>

          <ServiceFormActions />
        </Grid2>
        <Grid2 size={{ xs: 12 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
          // imagem para exibir na web
        </Grid2>
      </Grid2>
    </PageContainer>
  )
}

export default ServiceFormPage
