import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Button, Stack } from '@mui/material'
import { State } from '@/presentation/pages/service-form/components/atoms'
import { SaveFormAction, UpdateFormAction } from '@/presentation/pages/service-form/components'

export const ServiceFormActions: React.FC = () => {
  const navigate = useNavigate()
  const serviceId = useRecoilValue(State.idServiceCreateState)

  const edditing = !!serviceId

  return (
    <Stack spacing={2} direction='row' alignItems='center' justifyContent='flex-end' mx={2} mt={2}>
      <Button id="close-service-form-button" color="info" onClick={() => { navigate('/servicos') }}>
        Cancelar
      </Button>
      {edditing ? <UpdateFormAction /> : <SaveFormAction />}
    </Stack>
  )
}
