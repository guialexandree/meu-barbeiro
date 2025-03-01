import React from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { Dialog, DialogContent, DialogTitle, Divider, Stack } from '@mui/material'
import {
  TimeExecutionSlider,
  CreateUpdateServiceActions,
  CreateUpdateServiceRemoveAction,
  CreateUpdateServiceStatus,
} from '@/presentation/pages/services/components'
import { InputPrice, InputText } from '@/presentation/components'
import * as State from '@/presentation/pages/services/components/atoms'

export const CreateUpdateServiceForm: React.FC = () => {
  const serviceId = useRecoilValue(State.idNewServiceState)
  const [open, setOpen] = useRecoilState(State.isOpenFormServiceState)
  const resetName = useResetRecoilState(State.nameNewServiceState)
  const resetPrice = useResetRecoilState(State.priceNewServiceState)
  const resetTimeExecution = useResetRecoilState(State.timeExecutionNewServiceState)
  const resetDescription = useResetRecoilState(State.descriptionNewServiceState)
  const resetStatus = useResetRecoilState(State.statusNewServiceState)

  const edditing = !!serviceId

  const handleClose = (): void => {
    setOpen(false)
    resetName()
    resetPrice()
    resetTimeExecution()
    resetDescription()
    resetStatus()
  }

  return (
    <Dialog
      open={open}
      component="form"
      onSubmit={(event) => {
        event.preventDefault()
      }}
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
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <CreateUpdateServiceStatus />
            <CreateUpdateServiceRemoveAction />
          </Stack>

          <InputText
            state={State.nameNewServiceState}
            inputProps={{
              autoFocus: true,
              inputMode: 'text',
              label: 'Nome',
              id: 'service-name',
              name: 'name',
            }}
          />

          <InputText
            state={State.descriptionNewServiceState}
            inputProps={{
              inputMode: 'text',
              label: 'Descrição',
              id: 'service-description',
              name: 'description',
            }}
          />

          <InputPrice
            state={State.priceNewServiceState}
            inputProps={{
              inputMode: 'decimal',
              label: 'Preço',
              id: 'service-price',
              name: 'price',
            }}
          />

          <TimeExecutionSlider />
        </Stack>
      </DialogContent>
      <CreateUpdateServiceActions />
    </Dialog>
  )
}
