import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Autocomplete, Button, Grow, Icon, Slide, Stack, TextField, Typography } from '@mui/material'
import { State } from '@/presentation/pages/attendance-form/components/atoms'

export const Client: React.FC = () => {
  const users = useRecoilValue(State.usersState)
  const [selectedUser, setSelectedUser] = useRecoilState(State.selectedUserState)

  const options = React.useMemo(() => users.map((user) => ({ label: user.name.toUpperCase(), id: user.id })), [users])

  return (
    <Stack spacing={1.5}>
      <Slide direction="right" in mountOnEnter unmountOnExit style={{ transitionDelay: '50ms' }}>
        <Typography variant='h1' >ADICIONAR NA FILA</Typography>
      </Slide>

      <Grow in mountOnEnter unmountOnExit style={{ transitionDelay: '100ms' }}>
        <Autocomplete
          disablePortal
          fullWidth
          blurOnSelect
          value={selectedUser}
          options={options}
          sx={{
            backgroundColor: (theme) => `${theme.palette.primary.main}10`,
            borderRadius: 3,
            py: 0.2,
          }}
          popupIcon={<Icon>arrow_drop_down</Icon>}
          slotProps={{
            popper: {
              sx: {
                borderRadius: 4
              }
            },
            popupIndicator: {
              sx: {
                mr: 1,
                backgroundColor: (theme) => `${theme.palette.primary.light}40`,
              },
            },
            paper: {
              sx: {
                mt: -1.2,
                borderRadius: 3,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                border: 'solid 2px',
                borderColor: 'primary.main',
                borderTop: 0,
                backgroundColor: 'background.paper',
              },
            },
            listbox: {
              sx: {
                backgroundColor: (theme) => `${theme.palette.primary.main}10`,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                '& .MuiAutocomplete-option': {
                  fontSize: 14,
                  fontWeight: 500,
                },
              },
            },
          }}
          noOptionsText={
            <Button
              onClick={() => console.log(`Criar novo cliente '${selectedUser?.label || ''}'`)}
              variant="contained"
              color="primary"
              endIcon={<Icon>add</Icon>}
              sx={{ boxShadow: 0 }}
            >
              {`Criar cadastro`}
            </Button>
          }
          onChange={(_, newValue) => {
            setSelectedUser(newValue!)
          }}
          forcePopupIcon={false}
          renderInput={(params) => (
            <TextField
              slotProps={{
                input: {
                  ...params.InputProps,
                  sx: {
                    borderRadius: 3,
                    fontSize: 18,
                    fontWeight: selectedUser ? 500 : 300,
                    fontFamily: 'Inter',
                  },
                  startAdornment: selectedUser ? (
                   <Icon color='primary' sx={{mx: 1, fontSize: 30 }}>person</Icon>
                  ) : (
                    <Icon sx={{ color: 'text.secondary', mx: 1, fontSize: 30 }}>person</Icon>
                  ),
                },
              }}
              value={12}
              sx={{ '.MuiInputBase-root': { py: 0.8 } }}
              placeholder="Informe o cliente"
              name="client"
              {...params}
            />
          )}
        />
      </Grow>
    </Stack>
  )
}
