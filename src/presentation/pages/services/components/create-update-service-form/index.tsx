import React from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { ServiceModel } from '@/domain/models'
import { CreateService, RemoveService, RemoveServiceParams, UpdateService } from '@/domain/usecases'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Icon,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import * as State from '@/presentation/pages/services/components/atoms'
import { useNotify } from '@/presentation/hooks'

type CreateUpdateServiceFormProps = {
  updateService: UpdateService
  createService: CreateService
  removeService: RemoveService
}

export const CreateUpdateServiceForm: React.FC<CreateUpdateServiceFormProps> = (props) => {
  const { notify } = useNotify()
  const [newService, setNewService] = useRecoilState(State.newServiceState)
  const [open, setOpen] = useRecoilState(State.isOpenFormServiceState)
  const setServices = useSetRecoilState(State.servicesState)
  const setLoading = useSetRecoilState(State.isLoadingCreateUpdateState)
  const resetNewService = useResetRecoilState(State.newServiceState)

  const edditing = newService?.id ? true : false

  const onSuccess = (service: ServiceModel): void => {
    setServices((services) => {
      if (edditing) {
        const serviceIndex = services.findIndex(currentService => currentService.id === service.id)
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
      updateService()
    } else {
      createService()
    }
  }

  const updateService = (): void => {
    setLoading(true)

    props.updateService
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

  const createService = (): void => {
    setLoading(true)

    props.createService
      .create(newService)
      .then((service) => {
        notify('Serviço criado com sucesso', { type: 'success' })
        onSuccess(service)
      })
      .catch((error) => {
        notify('Erro ao atualizar serviço', { type: 'error' })
        console.error(error)
      })
      .finally(() => setLoading(false))
  }

  const removeService = (): void => {
    setLoading(true)

    const params: RemoveServiceParams = {
      id: newService.id,
    }

    props.removeService
      .remove(params)
      .then(() => {
        notify('Serviço removido com sucesso', { type: 'success' })
        setServices(services => services.filter(currentService => currentService.id !== newService.id))
        handleClose()
      })
      .catch((error) => {
        notify('Erro ao atualizar serviço', { type: 'error' })
        console.error(error)
      })
      .finally(() => setLoading(false))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    const { name, value } = event.target
    setNewService((currentState) => ({ ...currentState, [name]: value }))
  }

  const handleClose = (): void => {
    setOpen(false)
    resetNewService()
  }

  return (
    <Dialog
      open={open}
      component="form"
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        '.MuiPaper-root': {
          width: '100%',
        },
      }}
    >
      <DialogTitle>{`${edditing ? 'Editando' : 'Criando'} serviço`}</DialogTitle>
      <Divider />
      <DialogContent sx={{ width: '100%' }}>
        <Stack spacing={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <ToggleButtonGroup
              sx={{ pb: 1 }}
              size="small"
              color="primary"
              value={newService.status}
              exclusive
              onChange={(_, value) => {
                setNewService((currentState) => ({
                  ...currentState,
                  status: value,
                }))
              }}
              aria-label="status do serviço"
            >
              <ToggleButton value="ativo" defaultChecked sx={{ fontSize: 10 }}>
                Ativo
              </ToggleButton>
              <ToggleButton value="inativo" sx={{ fontSize: 10 }}>
                Ocultar
              </ToggleButton>
            </ToggleButtonGroup>
            {newService?.id && (
              <Button
                color="error"
                sx={{ color: 'error.light' }}
                onClick={removeService}
                size="small"
              >
                Remover serviço
              </Button>
            )}
          </Stack>

          <TextField size="small" value={newService.name} onChange={handleChange} label="Nome do serviço" name="name" />
          <TextField
            size="small"
            value={newService.description}
            onChange={handleChange}
            label="Descrição"
            name="description"
          />
          <TextField size="small" value={newService.price} onChange={handleChange} label="Preço" name="price" />

          <Stack px={1} pt={1}>
            <Typography id="input-slider" color="grey.500">
              Tempo de execução
            </Typography>
            <Slider
              aria-label="Always visible"
              defaultValue={80}
              getAriaValueText={(value) => `${value} minutos`}
              step={5}
              name="timeExecution"
              value={newService.timeExecution}
              onChange={(_, value) => {
                setNewService((currentState) => ({
                  ...currentState,
                  timeExecution: value as number,
                }))
              }}
              valueLabelDisplay="on"
              min={10}
              max={120}
              sx={{
                '& .MuiSlider-valueLabel': {
                  top: '52px',
                },
              }}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="info" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          size="large"
          variant="contained"
          color="error"
          onClick={handleSubmit}
          endIcon={<Icon>check</Icon>}
          href="#"
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
