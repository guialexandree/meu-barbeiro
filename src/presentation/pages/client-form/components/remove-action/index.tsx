import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Button } from '@mui/material'
import { RemoveServiceParams } from '@/domain/usecases'
import { useNotify } from '@/presentation/hooks'
import { State } from '@/presentation/pages/service-form/components/atoms'
import { State as ServicesState } from '@/presentation/pages/service-list/components/atoms'
import { Factories } from '@/main/factories/usecases'
import { DialogConfirm } from '@/presentation/components'

export const ServiceFormRemoveAction: React.FC = () => {
  const navigate = useNavigate()
  const { notify } = useNotify()
  const setServices = useSetRecoilState(ServicesState.List.servicesState)
  const setDialogConfirm = useSetRecoilState(State.openRemoveConfirmState)
  const serviceCreate = useRecoilValue(State.serviceCreateState)
  const setLoading = useSetRecoilState(State.loadingFormState)
  const { id } = useParams<{ id: string }>()

  const removeService = React.useMemo(() => Factories.makeRemoteRemoveService(), [])

  const onSuccess = (serviceId: string): void => {
    setServices((services) => services.filter((currentService) => currentService.id !== serviceId))
    notify('Serviço removido com sucesso', { type: 'success' })
    navigate('/servicos')
  }

  const handleRemoveService = React.useCallback((): void => {
    if (!id) return

    const params: RemoveServiceParams = {
      id,
    }

    setLoading(true)
    removeService
      .remove(params)
      .then((removeResult) => {
        if (removeResult.success) {
          return onSuccess(removeResult.data.id)
        }

        notify('Erro ao tentar remover serviço, tente novamente mais tarde', { type: 'error' })
      })
      .catch((error) => {
        notify('Erro ao atualizar serviço', { type: 'error' })
        console.error(error)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (!id) {
    return undefined
  }

  return (
    <>
      <Button color="error" sx={{ color: 'error.light' }} onClick={() => { setDialogConfirm(true) }} size="small">
        Remover
      </Button>

      <DialogConfirm
        title="Eliminação de serviço"
        answer={`O serviço ${serviceCreate.name.toUpperCase()} será eliminado, deseja continuar com a eliminação?`}
        onConfirm={handleRemoveService}
        openState={State.openRemoveConfirmState}
      />
    </>
  )
}
