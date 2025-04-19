import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Grid2, Paper, Stack, Typography } from '@mui/material'
import { ServiceModel } from '@/domain/models'
import { Factories } from '@/main/factories/usecases'
import { InputPrice, InputText, PageContainer } from '@/presentation/components'
import { ServiceFormRemoveAction, ServiceFormStatus, ServiceFormActions, ServiceFormTimeExecution } from './components'
import { State } from '@/presentation/pages/service-form/components/atoms'
import { useMobile, useNotify } from '@/presentation/hooks'

const ServiceFormPage: React.FC = () => {
  const navigate = useNavigate()
  const { notify } = useNotify()
  const { isMobile } = useMobile()
  const [loading, setLoading] = useRecoilState(State.loadingServiceState)
  const setName = useSetRecoilState(State.nameState)
  const setDescription = useSetRecoilState(State.descriptionState)
  const setPrice = useSetRecoilState(State.priceState)
  const setTimeExecution = useSetRecoilState(State.timeExecutionState)
  const setStatus = useSetRecoilState(State.statusState)
  const resetName = useResetRecoilState(State.nameState)
  const resetDescription = useResetRecoilState(State.descriptionState)
  const resetPrice = useResetRecoilState(State.priceState)
  const resetTimeExecution = useResetRecoilState(State.timeExecutionState)
  const resetStatus = useResetRecoilState(State.statusState)

  const { id } = useParams<{ id: string }>()

  const loadServiceById = React.useMemo(() => Factories.makeRemoteLoadServiceById(), [])

  React.useEffect(() => {
    resetName()
    resetDescription()
    resetPrice()
    resetTimeExecution()
    resetStatus()
  }, [])

  const onSucess = (service: ServiceModel) => {
    setName({ error: '', text: service.name })
    setDescription({ error: '', text: service.description })
    setPrice(service.price)
    setTimeExecution(service.timeExecution)
    setStatus(service.status)
  }

  React.useEffect(() => {
    if (id) {
      setLoading(true)
      loadServiceById
        .load({ id })
        .then((serviceResult) => {
          if (serviceResult.success) {
            return onSucess(serviceResult.data)
          }

          notify(serviceResult.error, { type: 'error' })
          navigate('/servicos')
        })
        .catch(() => {
          notify('Ocorreu erro ao tentar buscar pelo serviço', { type: 'error' })
          navigate('/servicos')
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  return (
    <PageContainer
      title="Cadastro de Serviço"
      subtitle="Crie serviços e ajuste preços para serem exibidos no app do cliente"
    >
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 6 }}  sx={{ mx: { xs: 2, sm: 4 } }}>
          <Stack spacing={2}>
            <Paper
              id="service-create-form"
              component="form"
              onSubmit={(event) => {
                event.preventDefault()
              }}
              sx={{
                py: 1.2,
                pr: 1.2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ ml: 3 }}>
                Status do Serviço
              </Typography>
              <ServiceFormStatus />
            </Paper>
            <Paper
              id="service-create-form"
              component="form"
              onSubmit={(event) => {
                event.preventDefault()
              }}
              sx={{
                mx: { xs: 2, sm: 4 },
                pt: 3,
                boxShadow: 3,
              }}
            >
              <Stack spacing={1} sx={{ mx: { xs: 3, sm: 5 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <ServiceFormRemoveAction />
                </Stack>

                <InputText
                  state={State.nameState}
                  inputProps={{
                    autoFocus: !isMobile,
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

              <ServiceFormActions />
            </Paper>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
          // imagem para exibir na web
        </Grid2>
      </Grid2>
    </PageContainer>
  )
}

export default ServiceFormPage
