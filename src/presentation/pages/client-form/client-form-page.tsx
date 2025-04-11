import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Button, Grid2, Icon, Paper, Stack, Typography } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { ServiceModel } from '@/domain/models'
import { Factories } from '@/main/factories/usecases'
import { InputPrice, InputText, PageContainer } from '@/presentation/components'
import {
  ServiceFormRemoveAction,
  ServiceFormStatus,
  ServiceFormActions,
  ServiceFormTimeExecution,
  ClientFormType,
} from './components'
import { State } from '@/presentation/pages/service-form/components/atoms'
import { useFormat, useMobile, useNotify } from '@/presentation/hooks'

const ServiceFormPage: React.FC = () => {
  const { formatPhoneNumber } = useFormat()
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
      title="Cadastro de Cliente"
      subtitle="Crie clientes ou barbeiros para utilizar o app"
      loading={loading}
    >
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 6 }} sx={{ mx: { xs: 2, sm: 4 } }}>
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
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ ml: 3 }}>
                Tipo do cadastro
              </Typography>
              <ClientFormType />
            </Paper>
            <Paper
              id="service-create-form"
              component="form"
              onSubmit={(event) => {
                event.preventDefault()
              }}
              sx={{
                pt: 3,
                boxShadow: 3,
              }}
            >
              <Stack spacing={1} sx={{ mx: { xs: 3, sm: 5 }, transition: 'all 0.3s' }}>
                <InputText
                  state={State.nameState}
                  inputProps={{
                    autoFocus: !isMobile,
                    inputMode: 'text',
                    label: 'Nome*',
                    id: 'client-name-input',
                    name: 'name',
                  }}
                />

                <InputText
                  state={State.descriptionState}
                  inputProps={{
                    slotProps: {
                      input: {
                        startAdornment: <WhatsAppIcon sx={{ mr: 1 }} />,
                      },
                    },
                    placeholder: '(11) 99999-9999',
                    inputMode: 'text',
                    label: 'Celular*',
                    id: 'service-description',
                    name: 'description',
                  }}
                />
                <InputText
                  state={State.descriptionState}
                  toogleVisibility
                  inputProps={{
                    inputMode: 'text',
                    type: 'password',
                    autoComplete: 'new-password',
                    label: 'Senha',
                    id: 'service-description',
                    name: 'description',
                  }}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="flex-end" p={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  type="submit"
                  title="Salvar"
                  startIcon={<WhatsAppIcon />}
                  endIcon={<Icon>share</Icon>}
                >
                  Compartilhar link do app
                </Button>
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
