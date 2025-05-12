import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Fade, TextField, TextFieldProps, useMediaQuery, useTheme } from '@mui/material'

type InputPhoneNumberProps = {
  state: RecoilState<{ text: string; error: string }>
  inputProps: TextFieldProps
  toogleVisibility?: boolean
  onClearError?: () => void
}

const InputPhoneNumber: React.FC<InputPhoneNumberProps> = (props) => {
  const [input, setInput] = useRecoilState(props.state)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()

    if (event.target.value.length > 15) {
      return
    }

    const value = event.target.value.replace(/\D/g, '')
    const formattedValue = value.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2')
    setInput({ error: '', text: formattedValue })
    props.onClearError?.()
  }

  return (
    <Fade in timeout={500} unmountOnExit mountOnEnter>
      <TextField
        size={isMobile ? 'small' : 'medium'}
        value={input.text}
        onChange={handleChange}
        ref={props.inputProps.ref}
        error={!!input.error}
        helperText={input.error}
        disabled={props.inputProps.disabled}
        autoFocus={props.inputProps.autoFocus}
        slotProps={{
          input: {
            autoFocus: props.inputProps.autoFocus,
            inputProps: {
              autoFocus: props.inputProps.autoFocus,
              id: props.inputProps.id,
            },
            startAdornment: <WhatsAppIcon sx={{ mr: 1, color: 'grey.500' }} />
          },
        }}
        {...props.inputProps}
      />
    </Fade>
  )
}

export default InputPhoneNumber
