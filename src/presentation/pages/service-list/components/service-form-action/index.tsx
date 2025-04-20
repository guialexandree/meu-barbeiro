import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Fab, Icon, Stack, Zoom } from '@mui/material'

export const ServiceFormAction: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignContent="center"
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 1,
        height: 36,
      }}
    >
      <Zoom in>
        <Fab
          color="primary"
          variant="extended"
          title="Criar novo serviço"
          id="service-create-button"
          onClick={() => {
            navigate('/servico/criar-novo')
          }}
          sx={{
            bottom: 30,
            transition: 'opacity 0.3s',
            ':hover': { opacity: 1 },
            ':active': { opacity: 1 },
          }}
        >
          <Icon sx={{ fontSize: 36, color: 'primary.dark' }}>add</Icon>
          criar novo
        </Fab>
      </Zoom>
    </Stack>
  )
}
