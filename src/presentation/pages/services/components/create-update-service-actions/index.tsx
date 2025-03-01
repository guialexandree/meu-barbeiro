import React from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { ServiceModel } from '@/domain/models'
import { Button, DialogActions, Icon } from '@mui/material'
import { useNotify } from '@/presentation/hooks'
import * as State from '@/presentation/pages/services/components/atoms'
import * as Factories from '@/main/factories/usecases'
import { serviceCreateValidation } from './validations'

export const CreateUpdateServiceActions: React.FC = () => {
  const { notify } = useNotify()
  const newService = useRecoilValue(State.newServiceState)
  const serviceId = useRecoilValue(State.idNewServiceState)
  const setOpen = useSetRecoilState(State.isOpenFormServiceState)
  const setServices = useSetRecoilState(State.servicesState)
  const setLoading = useSetRecoilState(State.isLoadingCreateUpdateState)
  const setName = useSetRecoilState(State.nameNewServiceState)
  const resetName = useResetRecoilState(State.nameNewServiceState)
  const resetPrice = useResetRecoilState(State.priceNewServiceState)
  const resetTimeExecution = useResetRecoilState(State.timeExecutionNewServiceState)
  const resetDescription = useResetRecoilState(State.descriptionNewServiceState)
  const resetStatus = useResetRecoilState(State.statusNewServiceState)

  const updateService = React.useMemo(() => Factories.makeRemoteUpdateService(), [])
  const createService = React.useMemo(() => Factories.makeRemoteCreateService(), [])
  const edditing = !!serviceId

  const onSuccess = (service: ServiceModel): void => {
    setServices((services) => {
      if (edditing) {
        const serviceIndex = services.findIndex((currentService) => currentService.id === service.id)
        if (serviceIndex > -1) {
          const newServices = [...services]
          newServices[serviceIndex] = service
          return newServices
        }
      }

      return [service, ...services]
    })
    notify('Serviço criado com sucesso', { type: 'success' })
    handleClose()
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

    if (edditing) {
      return handleUpdateService()
    } else {
      return handleCreateService()
    }
  }

  const validateForm = (): boolean => {
    const result = serviceCreateValidation.safeParse({
      name: newService.name,
      description: newService.description,
      price: newService.price,
      timeExecution: newService.timeExecution,
      status: newService.status,
    })

    if (!result.success) {
      const error = result.error.errors.at(0)!
      const inputName = error.path.at(0) as string
      onError(error.message, inputName)
    }

    return result.success
  }

  const handleUpdateService = (): void => {
    if (!validateForm()) return

    setLoading(true)
    updateService
      .update(newService)
      .then(() => {
        notify('Serviço atualizado com sucesso', { type: 'success' })
        onSuccess(newService)
      })
      .catch((error) => {
        notify('Não foi possível atualizar serviço', { type: 'error' })
        console.error(error)
      })
      .finally(() => setLoading(false))
  }

  const handleCreateService = (): void => {
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

  const handleClose = (): void => {
    setOpen(false)
    resetName()
    resetPrice()
    resetTimeExecution()
    resetDescription()
    resetStatus()
  }

  return (
    <DialogActions>
      <Button id="close-service-form-button" color="info" onClick={handleClose}>
        Cancelar
      </Button>
      <Button
        variant="contained"
        onClick={handleSubmit}
        type="submit"
        endIcon={<Icon>check</Icon>}
        id="save-service-button"
        href="#"
      >
        {edditing ? 'Editar' : 'Criar'}
      </Button>
    </DialogActions>
  )
}
