import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ServiceModel } from '@/domain/models'
import { Icon, IconButton } from '@mui/material'
import { useNotify } from '@/presentation/hooks'
import { State } from '@/presentation/pages/service-form/components/atoms'
import { State as ServiceState } from '@/presentation/pages/service-list/components/atoms'
import { Factories } from '@/main/factories/usecases'
import { DialogConfirm } from '@/presentation/components'

export const DeleteFormAction: React.FC = () => {
  const { notify } = useNotify()
  const navigate = useNavigate()
  const serviceForm = useRecoilValue(State.serviceFormState)
  const setServices = useSetRecoilState(ServiceState.List.servicesState)
  const setLoading = useSetRecoilState(State.loadingFormState)
  const setOpenDialog = useSetRecoilState(State.openRemoveConfirmState)
  const { id } = useParams<{ id: string }>()

  const removeService = React.useMemo(() => Factories.makeRemoteRemoveService(), [])

  const onSuccess = (service: ServiceModel): void => {
    setServices((services) => [service, ...services])
    notify('Serviço removido com sucesso', { type: 'success' })
    navigate('/servicos')
  }

  const handleDelete = async () => {
    if (!id) return

    setLoading(true)
    return removeService
      .remove({ id })
      .then((result) => {
        if (result.success) {
          return onSuccess(result.data)
        }

        notify(result.error, { type: 'error' })
      })
      .catch(() => {
        notify('Erro ao editar serviço', { type: 'error' })
      })
      .finally(() => setLoading(false))
  }

  if (!id) {
    return undefined
  }

  return (
    <>
      <IconButton color='inherit' onClick={() => { setOpenDialog(true) }}>
        <Icon>delete_outlined</Icon>
      </IconButton>

      <DialogConfirm
        icon="delete_outlined"
        title="Remover serviço"
        answer={`O serviço ${serviceForm.name.toUpperCase()} será atualizado, deseja continuar com a eliminação?`}
        onConfirm={handleDelete}
        openState={State.openRemoveConfirmState}
      />
    </>
  )
}
