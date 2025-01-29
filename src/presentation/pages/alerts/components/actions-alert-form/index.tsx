import React from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { Button, DialogActions, Icon } from '@mui/material'
import { AlertModel } from '@/domain/models'
import { CreateAlert, UpdateAlert } from '@/domain/usecases'
import { useNotify } from '@/presentation/hooks'
import * as State from '@/presentation/pages/alerts/components/atoms'

type ActionsAlertFormProps = {
  createAlert: CreateAlert
  updateAlert: UpdateAlert
}

export const ActionsAlertForm: React.FC<ActionsAlertFormProps> = (props) => {
  const { notify } = useNotify()
  const newAlert = useRecoilValue(State.newAlertState)
  const setLoading = useSetRecoilState(State.isLoadingSaveAlertState)
  const setOpen = useSetRecoilState(State.isOpenState)
  const setHomeAlert = useSetRecoilState(State.homeAlertState)
  const setServicesAlert = useSetRecoilState(State.servicesAlertState)
  const setHistorylert = useSetRecoilState(State.historyAlertState)
  const resetHomeAlert = useResetRecoilState(State.homeAlertState)
  const resetServicesAlert = useResetRecoilState(State.servicesAlertState)
  const resetHistorylert = useResetRecoilState(State.historyAlertState)
  const resetForm = useResetRecoilState(State.createUpdateAlertState)

  const edditing = newAlert?.id ? true : false

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
      updateAlert()
    } else {
      createAlert()
    }
  }

  const updateAlert = (): void => {
    setLoading(true)

    props.updateAlert
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

  const createAlert = (): void => {
    setLoading(true)

    props.createAlert
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
