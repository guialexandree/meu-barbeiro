import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { ServiceModel } from '@/domain/models'
import { UpdateService } from '@/domain/usecases'
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

type UpdateServiceFormProps = {
    updateService: UpdateService
}

export const UpdateServiceForm: React.FC<UpdateServiceFormProps> = (props) => {
  const [updateService, setUpdateService] = useRecoilState(State.updateServiceState)
  const setLoading = useSetRecoilState(State.isLoadingUpdateState)

  const handleSubmit = (): void => {
    setLoading(true)

    props.updateService
      .update(updateService)
      .then(() => {
        setUpdateService(null as unknown as ServiceModel)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    const { name, value } = event.target
    setUpdateService(currentState => ({ ...currentState, [name]: value }))
  }

  const handleClose = (): void => {
    setUpdateService(null as unknown as ServiceModel)
  }

  if (!updateService) {
    return null
  }

  return (
    <Dialog
      open={!!updateService}
      keepMounted
      component="form"
      onSubmit={handleSubmit}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        '.MuiPaper-root': {
          width: '100%',
        },
      }}
    >
      <DialogTitle>{'Editando serviço'}</DialogTitle>
      <Divider />
      <DialogContent sx={{ width: '100%' }}>
        <Stack spacing={1} >
          <ToggleButtonGroup
            sx={{ pb: 1}}
            size="small"
            color="primary"
            value={updateService.status}
            exclusive
            onChange={(_, value) => { setUpdateService(currentState => ({ ...currentState, status: value })) }}
            aria-label="status do serviço"
          >
            <ToggleButton value="ativo" defaultChecked sx={{ fontSize: 10 }}>Ativo</ToggleButton>
            <ToggleButton value="inativo" sx={{ fontSize: 10 }}>Ocultar</ToggleButton>
          </ToggleButtonGroup>

          <TextField size='small' value={updateService.name} onChange={handleChange} label="Nome do serviço" name="name" />
          <TextField size='small' value={updateService.description} onChange={handleChange} label="Descrição" name="description" />
          <TextField size='small' value={updateService.price} onChange={handleChange} label="Preço" name="price" />

          <Stack px={1} pt={1}>
            <Typography id="input-slider" color="grey.500">
              Tempo de execução
            </Typography>
            <Slider
              aria-label="Always visible"
              defaultValue={80}
              getAriaValueText={(value) => `${value} minutos`}
              step={5}
              name='timeExecution'
              value={updateService.timeExecution}
              onChange={(_, value) => { setUpdateService(currentState => ({ ...currentState, timeExecution: value as number })) }}
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
          color="primary"
          onClick={handleSubmit}
          type='submit'
          endIcon={<Icon>check</Icon>}
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
