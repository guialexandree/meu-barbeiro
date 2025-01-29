import React from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Button } from '@mui/material'
import { RemoveAlert, RemoveAlertParams } from '@/domain/usecases'
import * as State from '@/presentation/pages/alerts/components/atoms'
import { useNotify } from '@/presentation/hooks'

type ActionRemoveAlertFormProps = {
  removeAlert: RemoveAlert
}

export const ActionRemoveAlertForm: React.FC<ActionRemoveAlertFormProps> = (props) => {
  const { notify } = useNotify()
  const setOpenForm = useSetRecoilState(State.isOpenState)
  const newAlert = useRecoilValue(State.newAlertState)
  const setLoading = useSetRecoilState(State.isLoadingSaveAlertState)
  const resetHomeAlert = useResetRecoilState(State.homeAlertState)
  const resetServicesAlert = useResetRecoilState(State.servicesAlertState)
  const resetHistorylert = useResetRecoilState(State.historyAlertState)
  const resetForm = useResetRecoilState(State.createUpdateAlertState)

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

  const removeAlert = (): void => {
    setLoading(true)

    const params: RemoveAlertParams = {
      id: newAlert.id,
    }

    props.removeAlert
      .remove(params)
      .then(onSuccess)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  return (
    newAlert?.id && (
      <Button color="error" sx={{ color: 'error.light' }} onClick={removeAlert} size="small">
        Remover alerta
      </Button>
    )
  )
}
