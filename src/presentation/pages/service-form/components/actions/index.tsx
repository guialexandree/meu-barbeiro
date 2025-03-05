import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Slide, Stack } from '@mui/material'
import { SaveFormAction, UpdateFormAction } from '@/presentation/pages/service-form/components'

export const ServiceFormActions: React.FC = () => {
  const navigate = useNavigate()


  return (
    <Slide in={true} direction="left" unmountOnExit mountOnEnter>
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='flex-end' mx={2} mt={2}>
        <Button id="close-service-form-button" color="info" onClick={() => { navigate('/servicos') }}>
          Cancelar
        </Button>
        <UpdateFormAction />
        <SaveFormAction />
      </Stack>
    </Slide>
  )
}
