import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Slide, Stack } from '@mui/material'
import { SaveFormAction, UpdateFormAction } from '@/presentation/pages/service-form/components'

export const ServiceFormActions: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Slide in={true} direction="left" unmountOnExit mountOnEnter>
      <Stack direction="row" alignItems="center"  justifyContent="flex-end">
        <Button
          fullWidth
          id="close-clients-form-button"
          color="primary"
          onClick={() => {
            navigate('/clientes')
          }}
          sx={{ borderRadius: 0, py: 1.5, borderBottomLeftRadius: 4, ml: 0.3 }}
        >
          Cancelar
        </Button>
        <UpdateFormAction />
        <SaveFormAction />
      </Stack>
    </Slide>
  )
}
