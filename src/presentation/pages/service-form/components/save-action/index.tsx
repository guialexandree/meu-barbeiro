import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ServiceModel } from '@/domain/models'
import { Button, Icon } from '@mui/material'
import { useNotify } from '@/presentation/hooks'
import { State } from '@/presentation/pages/service-form/components/atoms'
import { State as ServiceState } from '@/presentation/pages/services/components/atoms'
import { serviceCreateValidation } from './validations'
import { Factories } from '@/main/factories/usecases'
import { useNavigate } from 'react-router-dom'

export const SaveFormAction: React.FC = () => {
  const { notify } = useNotify()
  const navigate = useNavigate()
  const newService = useRecoilValue(State.serviceCreateState)
  const setServices = useSetRecoilState(ServiceState.List.servicesState)
  const setLoading = useSetRecoilState(State.loadingState)
  const setName = useSetRecoilState(State.nameState)

  const createService = React.useMemo(() => Factories.makeRemoteCreateService(), [])

  const onSuccess = (service: ServiceModel): void => {
    setServices(services => [service, ...services])
    navigate('/servicos')
    notify('Serviço criado com sucesso', { type: 'success' })
  }

  const onError = (error: string, inputName: string): void => {
    if (inputName === 'name') {
      setName((currentState) => ({ ...currentState, error }))
      return
    }

    notify(error, { type: 'error' })
  }

  const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    handleServiceCreate()
  }

  const validateForm = (): boolean => {
    const result = serviceCreateValidation.safeParse(newService)

    if (!result.success) {
      const error = result.error.errors.at(0)!
      const inputName = error.path.at(0) as string
      onError(error.message, inputName)
    }

    return result.success
  }

  const handleServiceCreate = (): void => {
    if (!validateForm()) return

    setLoading(true)
    createService
      .create(newService)
      .then((result) => {
        if (result.success) {
          onSuccess({ ...newService, id: result.data.id })
          return
        }

        onError(result.error, 'name')
      })
      .catch(() => {
        notify('Erro ao criar serviço', { type: 'error' })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Button
      variant="contained"
      onClick={handleSubmit}
      type="submit"
      endIcon={<Icon>check</Icon>}
      id="save-service-button"
      href="#"
    >
      Criar
    </Button>
  )
}
