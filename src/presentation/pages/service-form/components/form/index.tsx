import React from 'react'
import { useRecoilValue } from 'recoil'
import { Fade, Icon, Paper, Stack } from '@mui/material'
import { InputPrice, InputText } from '@/presentation/components'
import { State } from '@/presentation/pages/service-form/components/atoms'
import { useMobile } from '@/presentation/hooks'

export const Form: React.FC = () => {
  const { isMobile } = useMobile()
  const loading = useRecoilValue(State.loadingFormState)

  return (
    <Fade in timeout={500} style={{ transitionDelay: '200ms' }} unmountOnExit>
      <Paper
        id="service-create-form"
        elevation={0}
        sx={{
          py: 2,
        }}
      >
        <Stack spacing={1.5} sx={{ mx: { xs: 2, sm: 5 }, transition: 'all 0.3s' }}>
            <InputText
              state={State.nameState}
              inputProps={{
                slotProps: {
                  input: {
                    startAdornment: <Icon sx={{ mr: 1, color: 'grey.500' }}>group</Icon>,
                  },
                },
                autoFocus: !isMobile,
                disabled: loading,
                inputMode: 'text',
                label: 'Nome',
                id: 'service-name',
                name: 'name',
              }}
            />

            <InputText
              state={State.descriptionState}
              inputProps={{
                inputMode: 'text',
                label: 'Descrição',
                disabled: loading,
                id: 'service-description',
                name: 'description',
              }}
            />

            <InputPrice
              state={State.priceState}
              inputProps={{
                slotProps: {
                  input: {
                    startAdornment: <Icon sx={{ mr: 1, color: 'grey.500' }}>price_change</Icon>,
                  },
                },
                inputMode: 'decimal',
                disabled: loading,
                label: 'Preço',
                id: 'service-price',
                name: 'price',
              }}
            />
        </Stack>
      </Paper>
    </Fade>
  )
}
