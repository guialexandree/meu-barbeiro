import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Fab, Icon, Stack, Zoom } from '@mui/material'

export const UserFormAction: React.FC = () => {
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
          title="Criar novo cadastro de cliente"
          id="user-create-action"
          onClick={() => {
            navigate('/clientes/criar-novo')
          }}
          sx={{
            bottom: 30,
            transition: 'opacity 0.3s',
            ':hover': { opacity: 1 },
            ':active': { opacity: 1 },
          }}
        >
          <Icon sx={{ mr: 1, fontSize: 24, color: 'primary.dark' }}>control_point</Icon>
          criar novo
        </Fab>
      </Zoom>
    </Stack>
  )
}
