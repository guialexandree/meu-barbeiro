import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Slide, Stack } from '@mui/material'
import { SaveAction, UpdateFormAction } from '@/presentation/pages/client-form/components'

export const Actions: React.FC = () => {
  const navigate = useNavigate()

  const handleGoBackToList = () => {
    navigate('/clientes')
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" mt={2} spacing={2}>
      <Slide in={true} direction="right" unmountOnExit mountOnEnter>
        <Button
          fullWidth
          id="close-clients-form-button"
          color="inherit"
          variant="outlined"
          onClick={handleGoBackToList}
        >
          Cancelar
        </Button>
      </Slide>
      <UpdateFormAction />
      <SaveAction />
    </Stack>
  )
}
