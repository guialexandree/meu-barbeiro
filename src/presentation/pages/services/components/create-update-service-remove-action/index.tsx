import React from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Button } from '@mui/material'
import { RemoveServiceParams } from '@/domain/usecases'
import { useNotify } from '@/presentation/hooks'
import * as State from '@/presentation/pages/services/components/atoms'
import * as Factories from '@/main/factories/usecases'

export const CreateUpdateServiceRemoveAction: React.FC = () => {
  const { notify } = useNotify()
  const serviceId = useRecoilValue(State.idNewServiceState)
  const setOpen = useSetRecoilState(State.isOpenFormServiceState)
  const setServices = useSetRecoilState(State.servicesState)
  const setLoading = useSetRecoilState(State.isLoadingCreateUpdateState)
  const resetName = useResetRecoilState(State.nameNewServiceState)
  const resetPrice = useResetRecoilState(State.priceNewServiceState)
  const resetTimeExecution = useResetRecoilState(State.timeExecutionNewServiceState)
  const resetDescription = useResetRecoilState(State.descriptionNewServiceState)
  const resetStatus = useResetRecoilState(State.statusNewServiceState)

  const removeService = React.useMemo(() => Factories.makeRemoteRemoveService(), [])

  const handleRemoveService = (): void => {
    setLoading(true)

    const params: RemoveServiceParams = {
      id: serviceId,
    }

    removeService
      .remove(params)
      .then(() => {
        notify('Serviço removido com sucesso', { type: 'success' })
        setServices((services) => services.filter((currentService) => currentService.id !== serviceId))
        handleClose()
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

  if (!serviceId.length) {
    return undefined
  }

  return (
    <Button color="error" sx={{ color: 'error.light' }} onClick={handleRemoveService} size="small">
      Remover
    </Button>
  )
}
