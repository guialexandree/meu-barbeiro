import React from 'react'
import { Fab, Icon, Stack, Zoom } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { GenericState } from '@/presentation/components/atoms'

export const OpenFormAction: React.FC = () => {
  const company = useRecoilValue(GenericState.companyState)

  if (company.statusAttendance !== 'serving') {
    return null
  }

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
          onClick={() => {}}
          sx={{
            bottom: 30,
            transition: 'opacity 0.3s',
            ':hover': { opacity: 1 },
            ':active': { opacity: 1 },
          }}
        >
          <Icon sx={{ mr: 1, fontSize: 24, color: 'primary.dark' }}>data_saver_on</Icon>
          adicionar na fila
        </Fab>
      </Zoom>
    </Stack>
  )
}
