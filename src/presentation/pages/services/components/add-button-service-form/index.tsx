import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Fab, Icon, Stack, Zoom } from '@mui/material'
import { CreateUpdateServiceForm } from '@/presentation/pages/services/components'
import * as State from '@/presentation/pages/services/components/atoms'

export const AddButtonServiceForm: React.FC = () => {
  const setOpenForm = useSetRecoilState(State.isOpenFormServiceState)

  return (
    <>
      <Stack direction="row" justifyContent="center">
        <Zoom in>
          <Fab
            onClick={() => {
              setOpenForm(true)
            }}
            sx={{
              position: 'fixed',
              bottom: '16px',
              opacity: 0.8,
              transition: 'opacity 0.3s',
              ':hover': { opacity: 1 },
              ':active': { opacity: 1 },
            }}
          >
            <Icon sx={{ fontSize: 36, color: 'primary.dark' }}>add</Icon>
          </Fab>
        </Zoom>
      </Stack>

      <CreateUpdateServiceForm />
    </>
  )
}
