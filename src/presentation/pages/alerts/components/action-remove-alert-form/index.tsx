import React from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Button } from '@mui/material'
import { RemoveAlertParams } from '@/domain/usecases'
import { State } from '@/presentation/pages/alerts/components/atoms'
import { useNotify } from '@/presentation/hooks'
import { Factories } from '@/main/factories/usecases'
import { DialogConfirm } from '@/presentation/components'

export const ActionRemoveAlertForm: React.FC = () => {
  const { notify } = useNotify()
  const setOpenForm = useSetRecoilState(State.CreateUpdateForm.isOpenState)
  const newAlert = useRecoilValue(State.CreateUpdateForm.newAlertState)
  const setLoading = useSetRecoilState(State.CreateUpdateForm.isLoadingSaveAlertState)
  const resetHomeAlert = useResetRecoilState(State.homeAlertState)
  const resetServicesAlert = useResetRecoilState(State.servicesAlertState)
  const resetHistorylert = useResetRecoilState(State.historyAlertState)
  const resetForm = useResetRecoilState(State.CreateUpdateForm.createUpdateAlertState)

  const removeAlert = React.useMemo(() => Factories.makeRemoteRemoveAlert(), [])

  const onSuccess = (): void => {
    notify('Aviso removido com sucesso', { type: 'success' })

    const resetAlert = {
      home: resetHomeAlert,
      services: resetServicesAlert,
      history: resetHistorylert,
    }[newAlert.type]

    resetAlert()
    resetForm()
    setOpenForm(false)
  }

  const handleRemoveAlert = (): void => {
    setLoading(true)

    const params: RemoveAlertParams = {
      id: newAlert.id,
    }

    removeAlert
      .remove(params)
      .then(onSuccess)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  if (!newAlert?.id) {
    return undefined
  }

  return (
    <>
      <Button color="error" sx={{ color: 'error.light' }} onClick={handleRemoveAlert} size="small">
        Remover alerta
      </Button>

      <DialogConfirm
        title="Eliminação de serviço"
        answer={`A mensagem da tela ${newAlert.type.toUpperCase()} será eliminada, deseja continuar com a eliminação?`}
        onConfirm={() => {}}
        openState={State.openDialogConfirmState}
      />
    </>
  )
}
