import React from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { ServiceModel } from '@/domain/models'
import { Button, DialogActions, Icon } from '@mui/material'
import { useNotify } from '@/presentation/hooks'
import * as State from '@/presentation/pages/services/components/atoms'
import * as Factories from '@/main/factories/usecases'

export const CreateUpdateServiceActions: React.FC = () => {
  const { notify } = useNotify()
  const newService = useRecoilValue(State.newServiceState)
  const serviceId = useRecoilValue(State.idNewServiceState)
  const setOpen = useSetRecoilState(State.isOpenFormServiceState)
  const setServices = useSetRecoilState(State.servicesState)
  const setLoading = useSetRecoilState(State.isLoadingCreateUpdateState)
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
    handleClose()
  }

  const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()

    if (edditing) {
      handleUpdateService()
    } else {
      handleCreateService()
    }
  }

  const handleUpdateService = (): void => {
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
    setLoading(true)

    createService
      .create(newService)
      .then(() => {
        notify('Serviço criado com sucesso', { type: 'success' })
        onSuccess({ ...newService, id: (Math.random() * 100).toString() })
      })
      .catch((error) => {
        notify('Erro ao atualizar serviço', { type: 'error' })
        console.error(error)
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
      <Button color="info" onClick={handleClose}>
        Cancelar
      </Button>
      <Button
        variant="contained"
        onClick={handleSubmit}
        endIcon={<Icon>check</Icon>}
        href="#"
      >
        {edditing ? 'Editar' : 'Criar'}
      </Button>
    </DialogActions>
  )
}
