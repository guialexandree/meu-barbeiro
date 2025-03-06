import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import { Fade, Icon, IconButton, InputAdornment, TextField, TextFieldProps, useMediaQuery, useTheme } from '@mui/material'

type InputTextProps = {
  state: RecoilState<{ text: string; error: string }>
  inputProps: TextFieldProps
  toogleVisibility?: boolean
  onClearError?: () => void
}

const InputText: React.FC<InputTextProps> = (props) => {
  const [visible, setVisible] = React.useState(false)
  const [input, setInput] = useRecoilState(props.state)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setInput({ error: '', text: event.target.value })
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
              style: {
                textTransform: 'uppercase'
              }
            },
            endAdornment: props.toogleVisibility && (
              <InputAdornment position="end">
                <IconButton
                  id="toggle-password-visibility"
                  aria-label="toggle password visibility"
                  onClick={() => setVisible((currentValue) => !currentValue)}
                  edge="end"
                >
                  <Icon sx={{ color: 'grey.600', fontSize: 22 }}>{visible ? 'visibility_off' : 'visibility'}</Icon>
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        {...props.inputProps}
        type={visible ? 'text' : props.inputProps.type}
      />
    </Fade>
  )
}

export default InputText
