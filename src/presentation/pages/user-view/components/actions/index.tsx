import React from 'react'
import { useNavigate } from 'react-router-dom'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Button, Icon, Slide, Stack } from '@mui/material'

export const UserActions: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Stack direction="row" alignItems="center" width="100%" spacing={1} mt={1}>
      <Slide in={true} direction="right" unmountOnExit mountOnEnter>
        <Button
          fullWidth
          id="go-to-list-action"
          startIcon={<Icon>arrow_back</Icon>}
          color="inherit"
          variant="outlined"
          sx={{ borderColor: 'grey.700' }}
          onClick={() => {
            navigate('/clientes')
          }}
        >
          voltar
        </Button>
      </Slide>

      <Slide in={true} direction="left" unmountOnExit mountOnEnter>
        <Button
          fullWidth
          id="go-to-list-action"
          variant="outlined"
          onClick={() => {
            navigate('/clientes')
          }}
          endIcon={<WhatsAppIcon />}
          color="success"
        >
          WhatsApp
        </Button>
      </Slide>
    </Stack>
  )
}
