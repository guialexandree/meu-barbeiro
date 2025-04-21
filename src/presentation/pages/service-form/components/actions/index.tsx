import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Slide, Stack } from '@mui/material'
import { SaveFormAction, UpdateFormAction } from '@/presentation/pages/service-form/components'

export const Actions: React.FC = () => {
  const navigate = useNavigate()

  const handleGoBackToList = () => {
    navigate('/servicos')
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" mt={2} spacing={2}>
      <Slide in direction="right" unmountOnExit mountOnEnter>
        <Button
          fullWidth
          id="close-service-form-action"
          color="inherit"
          variant="outlined"
          sx={{ borderColor: 'grey.700' }}
          onClick={handleGoBackToList}
        >
          Cancelar
        </Button>
      </Slide>
      <UpdateFormAction />
      <SaveFormAction />
    </Stack>
  )
}
