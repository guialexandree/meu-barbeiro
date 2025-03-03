import React from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Button, DialogActions, Icon } from '@mui/material'
import { AlertModel } from '@/domain/models'
import { useNotify } from '@/presentation/hooks'
import { State } from '@/presentation/pages/alerts/components/atoms'
import { Factories } from '@/main/factories/usecases'

export const ActionsAlertForm: React.FC = () => {
  const { notify } = useNotify()
  const newAlert = useRecoilValue(State.CreateUpdateForm.newAlertState)
  const setLoading = useSetRecoilState(State.CreateUpdateForm.isLoadingSaveAlertState)
  const setOpen = useSetRecoilState(State.CreateUpdateForm.isOpenState)
  const setHomeAlert = useSetRecoilState(State.homeAlertState)
  const setServicesAlert = useSetRecoilState(State.servicesAlertState)
  const setHistorylert = useSetRecoilState(State.historyAlertState)
  const resetHomeAlert = useResetRecoilState(State.homeAlertState)
  const resetServicesAlert = useResetRecoilState(State.servicesAlertState)
  const resetHistorylert = useResetRecoilState(State.historyAlertState)
  const resetForm = useResetRecoilState(State.CreateUpdateForm.createUpdateAlertState)

  const edditing = newAlert?.id ? true : false
  const updateAlert = React.useMemo(() => Factories.makeRemoteUpdateAlert(), [])
  const createAlert = React.useMemo(() => Factories.makeRemoteCreateAlert(), [])

  const onSuccess = (alert: AlertModel): void => {
    if (alert.id) {
      const setAlert = {
        home: setHomeAlert,
        services: setServicesAlert,
        history: setHistorylert,
      }[alert.type]
      setAlert(alert)
    } else {
      const resetAlert = {
        home: resetHomeAlert,
        services: resetServicesAlert,
        history: resetHistorylert,
      }[alert.type]
      resetAlert()
    }

    resetForm()
    handleClose()
  }

  const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()

    if (edditing) {
      handleUpdateAlert()
    } else {
      handleCreateAlert()
    }
  }

  const handleUpdateAlert = (): void => {
    setLoading(true)

    updateAlert
      .update(newAlert)
      .then(() => {
        notify('Aviso atualizado com sucesso', { type: 'success' })
        onSuccess(newAlert)
      })
      .catch((error) => {
        notify('Não foi possível atualizar aviso', { type: 'error' })
        console.error(error)
      })
      .finally(() => setLoading(false))
  }

  const handleCreateAlert = (): void => {
    setLoading(true)

    createAlert
      .create(newAlert)
      .then(() => {
        notify(`Aviso ${edditing ? 'editado' : 'criado'} com sucesso`, { type: 'success' })
        onSuccess({ ...newAlert, id: `${Math.random() * 100}` })
      })
      .catch((error) => {
        notify('Erro ao atualizar aviso', { type: 'error' })
        console.error(error)
      })
      .finally(() => setLoading(false))
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <DialogActions>
      <Button color="info" onClick={handleClose}>
        Cancelar
      </Button>
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        endIcon={<Icon>check</Icon>}
        href="#"
      >
        Salvar
      </Button>
    </DialogActions>
  )
}
