import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ServiceModel } from '@/domain/models'
import { Button, Icon } from '@mui/material'
import { useNotify } from '@/presentation/hooks'
import { State } from '@/presentation/pages/service-form/components/atoms'
import { State as ServiceState } from '@/presentation/pages/services/components/atoms'
import { serviceUpdateValidation } from './validations'
import { Factories } from '@/main/factories/usecases'
import { useNavigate } from 'react-router-dom'

export const UpdateFormAction: React.FC = () => {
  const { notify } = useNotify()
  const navigate = useNavigate()
  const newService = useRecoilValue(State.serviceCreateState)
  const setServices = useSetRecoilState(ServiceState.List.servicesState)
  const setLoading = useSetRecoilState(State.loadingState)
  const setName = useSetRecoilState(State.nameState)

  const updateService = React.useMemo(() => Factories.makeRemoteUpdateService(), [])

  const onSuccess = (service: ServiceModel): void => {
    setServices((services) => [service, ...services])
    notify('Serviço atualizado com sucesso', { type: 'success' })
    navigate('/servicos')
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
    handleServiceUpdate()
  }

  const validateForm = (): boolean => {
    const result = serviceUpdateValidation.safeParse(newService)

    if (!result.success) {
      const error = result.error.errors.at(0)!
      const inputName = error.path.at(0) as string
      onError(error.message, inputName)
    }

    return result.success
  }

  const handleServiceUpdate = (): void => {
    if (!validateForm()) return

    setLoading(true)
    updateService
      .update(newService)
      .then((result) => {
        if (result.success) {
          return onSuccess(newService)
        }

        onError(result.error, 'name')
      })
      .catch(() => {
        notify('Erro ao editar serviço', { type: 'error' })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Button
      variant="contained"
      onClick={handleSubmit}
      type="submit"
      endIcon={<Icon>check</Icon>}
      id="update-service-button"
      href="#"
    >
      Editar
    </Button>
  )
}
