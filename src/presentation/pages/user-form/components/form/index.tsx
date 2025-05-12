import React from 'react'
import { useRecoilValue } from 'recoil'
import { Fade, Icon, Paper, Stack } from '@mui/material'
import { InputPhoneNumber, InputText } from '@/presentation/components'
import { State } from '@/presentation/pages/user-form/components/atoms'
import { useMobile } from '@/presentation/hooks'

export const Form: React.FC = () => {
  const { isMobile } = useMobile()
  const loading = useRecoilValue(State.loadingFormState)

  return (
    <Fade in timeout={500} style={{ transitionDelay: '200ms' }} unmountOnExit>
      <Paper
        id="client-create-form"
        elevation={0}
        sx={{
          py: 2,
        }}
      >
        <Stack spacing={1.5} sx={{ mx: { xs: 2, sm: 5 }, transition: 'all 0.3s' }}>
          <InputPhoneNumber
            state={State.contactNumberState}
            inputProps={{
              placeholder: '(11) 99999-9999',
              type: 'tel',
              disabled: loading,
              id: 'client-contact-number',
              name: 'contactNumber',
            }}
          />
          <InputText
            state={State.nameState}
            inputProps={{
              slotProps: {
                input: {
                  startAdornment: <Icon sx={{ mr: 1, color: 'grey.500' }}>person_outlined</Icon>,
                },
              },
              autoFocus: !isMobile,
              inputMode: 'text',
              disabled: loading,
              placeholder: 'Nome',
              id: 'client-name-input',
              name: 'name',
            }}
          />

          {/* <InputText
            state={State.nicknameState}
            inputProps={{
              inputMode: 'text',
              disabled: loading,
              placeholder: 'Apelido',
              id: 'client-nickname-input',
              name: 'nickname',
            }}
          /> */}

          {/* <InputText
            state={State.passwordState}
            toogleVisibility
            inputProps={{
              slotProps: {
                input: {
                  startAdornment: (
                    <Icon color="action" sx={{ mr: 1, color: 'grey.500' }}>
                      password
                    </Icon>
                  ),
                },
              },
              inputMode: 'text',
              type: 'password',
              autoComplete: 'new-password',
              disabled: loading,
              label: 'Senha',
              placeholder: 'Senha',
              id: 'client-password',
              name: 'password',
            }}
          /> */}
        </Stack>
      </Paper>
    </Fade>
  )
}
