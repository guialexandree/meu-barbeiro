import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Autocomplete, Button, Icon, Stack, TextField, Typography } from '@mui/material'
import { State } from '@/presentation/pages/attendance-form/components/atoms'

export const Client: React.FC = () => {
  const users = useRecoilValue(State.usersState)
  const [selectedUser, setSelectedUser] = useRecoilState(State.selectedUserState)

  const options = React.useMemo(() => users.map((user) => ({ label: user.name.toUpperCase(), id: user.id })), [users])

  return (
    <Stack spacing={1.5}>
      <Typography variant="h1">ADICIONAR NA FILA</Typography>

      <Autocomplete
        disablePortal
        fullWidth
        blurOnSelect
        value={selectedUser}
        options={options}
        sx={{
          backgroundColor: (theme) => `${theme.palette.primary.light}20`,
        }}
        popupIcon={<Icon>keyboard_arrow_down</Icon>}
        slotProps={{
          popupIndicator: {
            sx: {
              backgroundColor: (theme) => `${theme.palette.primary.light}40`,
            },
          },
          paper: {
            sx: {
              mt: -0.5,
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
              backgroundColor: (theme) => `${theme.palette.primary.light}20`,
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
        nonce=""
        onChange={(_, newValue) => {
          setSelectedUser(newValue!)
          // // Close the keyboard after selecting an item
          // const input = document.activeElement as HTMLElement
          // input?.blur()
        }}
        renderInput={(params) => (
          <TextField {...params} label="Cliente" value={12} placeholder="Informe o cliente" name="client" />
        )}
      />
    </Stack>
  )
}
