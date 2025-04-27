import React from 'react'
import { useRecoilValue } from 'recoil'
import { Fade, FormControlLabel, Paper, Stack, styled, Switch, Typography } from '@mui/material'
import { State } from '@/presentation/pages/user-form/components/atoms'

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}))

export const PermissionsPanel: React.FC = () => {
  const userType = useRecoilValue(State.userTypeState)

  if (userType !== 'barber') {
    return null
  }


  return (
    <Fade in timeout={500} style={{ transitionDelay: '100ms' }} unmountOnExit>
      <Paper
        id="user-permissions-form"
        variant="elevation"
        elevation={0}
        sx={{
          py: 2,
          pr: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="body2" fontWeight={500} sx={{ ml: 3, fontFamily: 'Inter' }}>
          Permissões
        </Typography>

        <Stack mt={1.5} alignItems={'flex-start'} px={3}>
          <FormControlLabel
            slotProps={{
              typography: { fontSize: 12, fontFamily: 'Inter' },
            }}
            control={<Android12Switch defaultChecked />}
            label="Permitir acesso ao app"
          />
          <FormControlLabel
            slotProps={{
              typography: { fontSize: 12, fontFamily: 'Inter' },
            }}
            control={<Android12Switch />}
            label="Permitir alterar iniciar/encerrar fila"
          />
          <FormControlLabel
            slotProps={{
              typography: { fontSize: 12, fontFamily: 'Inter' },
            }}
            control={<Android12Switch />}
            label="Controlar clientes na fila"
          />
          <FormControlLabel
            slotProps={{
              typography: { fontSize: 12, fontFamily: 'Inter' },
            }}
            control={<Android12Switch />}
            label="Controlar cadastros de clientes"
          />
        </Stack>
      </Paper>
    </Fade>
  )
}
