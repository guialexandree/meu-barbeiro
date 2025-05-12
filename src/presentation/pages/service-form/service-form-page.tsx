import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useResetRecoilState, useSetRecoilState } from 'recoil'
import { Grid2, Stack } from '@mui/material'
import { ServiceModel } from '@/domain/models'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/service-form/components/atoms'
import { PageContainer } from '@/presentation/components'
import { StatusSwitch, Form, Actions, TimeExecution } from '@/presentation/pages/service-form/components'
import { useNotify } from '@/presentation/hooks'

const ServiceFormPage: React.FC = () => {
  const navigate = useNavigate()
  const { notify } = useNotify()
  const setLoading = useSetRecoilState(State.loadingServiceState)
  const setName = useSetRecoilState(State.nameState)
  const setServiceResult = useSetRecoilState(State.serviceResultState)
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
    setServiceResult(service)
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
        <Grid2 size={{ xs: 12, sm: 6 }} sx={{ mx: { xs: 2, sm: 4 } }}>
          <Stack spacing={1} component='form' onSubmit={(event) => event.preventDefault()}>
            <StatusSwitch />
            <Form />
            <TimeExecution />
            <Actions />
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
