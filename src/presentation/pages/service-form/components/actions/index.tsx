import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Slide, Stack } from '@mui/material'
import { SaveFormAction, UpdateFormAction } from '@/presentation/pages/service-form/components'

export const ServiceFormActions: React.FC = () => {
  const navigate = useNavigate()

  const handleGoBackToList = () => {
    navigate('/servicos')
  }

  return (
    <Slide in={true} direction="left" unmountOnExit mountOnEnter>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" mt={2} spacing={2}>
        <Button
          fullWidth
          id="close-service-form-button"
          color="inherit"
          variant="outlined"
          sx={{ borderColor: 'grey.700' }}
          onClick={handleGoBackToList}
        >
          Cancelar
        </Button>
        <UpdateFormAction />
        <SaveFormAction />
      </Stack>
    </Slide>
  )
}
