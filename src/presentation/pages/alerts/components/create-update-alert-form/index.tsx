import React from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Divider,
  Icon,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import * as State from '@/presentation/pages/alerts/components/atoms'
import {
  CreateAlert,
  CreateAlertParams,
  RemoveAlert,
  RemoveAlertParams,
  UpdateAlert,
  UpdateAlertParams,
} from '@/domain/usecases'
import { useNotify } from '@/presentation/hooks'
import { AlertModel } from '@/domain/models'

type CreateUpdateAlertFormProps = {
  createAlert: CreateAlert
  updateAlert: UpdateAlert
  removeAlert: RemoveAlert
}

export const CreateUpdateAlertForm: React.FC<CreateUpdateAlertFormProps> = (props) => {
  const { notify } = useNotify()
  const [, setLoading] = useRecoilState(State.isLoadingSaveAlertState)
  const [open, setOpen] = useRecoilState(State.isOpenState)
  const [newAlert, setNewAlert] = useRecoilState(State.newAlertState)
  const setHomeAlert = useSetRecoilState(State.homeAlertState)
  const setServicesAlert = useSetRecoilState(State.servicesAlertState)
  const setHistorylert = useSetRecoilState(State.historyAlertState)
  const resetNewAlert = useResetRecoilState(State.newAlertState)

  const onSuccess = (alert: AlertModel): void => {
    const setAlert = {
      home: setHomeAlert,
      services: setServicesAlert,
      history: setHistorylert,
    }[alert.type]
    setAlert(alert)

    resetNewAlert()
    handleClose()
  }

  const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    const edditing = newAlert?.id ? true : false

    if (edditing) {
      updateAlert()
    } else {
      createAlert()
    }
  }

  const updateAlert = (): void => {
    setLoading(true)

    const params: UpdateAlertParams = {
      id: newAlert.id,
      message: newAlert.message,
      status: newAlert.status,
      type: newAlert.type,
    }

    props.updateAlert
      .update(params)
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

  const removeAlert = (): void => {
    setLoading(true)

    const params: RemoveAlertParams = {
      id: newAlert.id,
    }

    props.removeAlert
      .remove(params)
      .then(alert => {
        notify('Aviso removido com sucesso', { type: 'success' })
        onSuccess(alert)
      })
      .catch((error) => {
        notify('Não foi possível remover o aviso', { type: 'error' })
        console.error(error)
      })
      .finally(() => setLoading(false))
  }

  const createAlert = (): void => {
    setLoading(true)

    const params: CreateAlertParams = {
      id: newAlert.id,
      message: newAlert.message,
      status: newAlert.status,
      type: newAlert.type,
    }

    props.createAlert
      .create(params)
      .then(alert => {
        notify('Aviso criado com sucesso', { type: 'success' })
        onSuccess(alert)
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

  const titleType = {
    home: 'principal',
    services: 'tabela de preços',
    history: 'histórico de atendimentos',
  }[newAlert.type]

  return (
    <Dialog
      open={open}
      keepMounted
      component="form"
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        '.MuiPaper-root': {
          width: '100%',
        },
      }}
    >
      <Stack direction="row" alignItems="center" mx={2} spacing={2} p={1}>
        <Icon sx={{ m: 0 }} color="secondary">
          notification_add
        </Icon>
        <Stack>
          <DialogTitle sx={{ p: 0 }}>{'Configurar aviso'}</DialogTitle>
          <DialogTitle
            variant="body2"
            color="grey.500"
            sx={{ p: 0, lineHeight: 1 }}
          >
            {`O aviso será exibido na tela ${titleType} do app do cliente`}
          </DialogTitle>
        </Stack>
      </Stack>
      <Divider />
      <DialogContent sx={{ width: '100%', pt: 1 }}>
        <Stack spacing={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <ToggleButtonGroup
              sx={{ pb: 1, height: 40 }}
              size="small"
              color="primary"
              value={newAlert?.status}
              exclusive
              onChange={(_, value) => {
                setNewAlert((currentState) => ({
                  ...currentState,
                  status: value,
                }))
              }}
              aria-label="Platform"
            >
              <ToggleButton value="ativo" defaultChecked sx={{ fontSize: 12 }}>
                Ativo
              </ToggleButton>
              <ToggleButton value="inativo" sx={{ fontSize: 12 }}>
                Ocultar
              </ToggleButton>
            </ToggleButtonGroup>
            {newAlert?.id && (
              <Button
                color="error"
                sx={{ color: 'error.light' }}
                onClick={removeAlert}
                size="small"
              >
                Remover alerta
              </Button>
            )}
          </Stack>

          <TextField
            multiline
            autoFocus
            value={newAlert?.message}
            onChange={(event) => {
              setNewAlert((currentState) => ({
                ...currentState,
                message: event.target.value,
              }))
            }}
            label="Mensagem"
            name="message"
            size="small"
            rows={4}
            fullWidth
          />
        </Stack>
      </DialogContent>
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
    </Dialog>
  )
}
