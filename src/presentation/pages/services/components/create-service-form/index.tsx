import React from 'react'
import { useRecoilState } from 'recoil'
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

export const CreateServiceForm: React.FC = () => {
  const [open, setOpen] = useRecoilState(State.isOpenState)
  const [name, setName] = useRecoilState(State.newServiceNameState)
  const [description, setDescription] = useRecoilState(State.newServiceDescriptionState)
  const [price, setPrice] = useRecoilState(State.newServicePriceState)
  const [timeExecution, setTimeExecution] = useRecoilState(State.newServiceTimeExecutionState)

  const handleSubmit = (): void => {
    setOpen(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    const { name, value } = event.target

    const setter = {
      name: setName,
      description: setDescription,
      price: (value: string) => setPrice(+value),
      timeExecution: (value: string) => setTimeExecution(+value),
    }[name]

    setter?.(value)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
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
      <DialogTitle>{'Criar novo serviço'}</DialogTitle>
      <Divider />
      <DialogContent sx={{ width: '100%' }}>
        <Stack spacing={1} >
          <ToggleButtonGroup
            sx={{ pb: 1 }}
            size="small"
            fullWidth
            color="primary"
            value={'active'}
            exclusive
            onChange={() => {}}
            aria-label="Platform"
          >
            <ToggleButton value="active">Ativo</ToggleButton>
            <ToggleButton value="notactive">Ocultar</ToggleButton>
          </ToggleButtonGroup>

          <TextField value={name} onChange={handleChange} label="Nome do serviço" name="name" fullWidth />
          <TextField value={description} onChange={handleChange} label="Descrição" name="description" />
          <TextField value={price} onChange={handleChange} label="Preço" name="price" />

          <Stack px={1} pt={1}>
            <Typography id="input-slider" color="grey.500">
              Tempo de execução
            </Typography>
            <Slider
              aria-label="Always visible"
              defaultValue={80}
              getAriaValueText={(value) => `${value} minutos`}
              step={5}
              value={timeExecution}
              onChange={(_, value) => setTimeExecution(value as number)}
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
          onClick={handleClose}
          type='submit'
          endIcon={<Icon>check</Icon>}
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
