import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import { Icon, IconButton, InputAdornment, TextField, TextFieldProps, useMediaQuery, useTheme } from '@mui/material'

type InputTextProps = {
  state: RecoilState<{ text: string; error: string }>
  inputProps: TextFieldProps
  toogleVisibility?: boolean
}

const InputText: React.FC<InputTextProps> = (props) => {
  const [visible, setVisible] = React.useState(false)
  const [input, setInput] = useRecoilState(props.state)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setInput({ error: '', text: event.target.value })
  }

  return (
    <TextField
      size={isMobile ? 'small' : 'medium'}
      value={input.text}
      onChange={handleChange}
      error={!!input.error}
      helperText={input.error}
      slotProps={{
        input: {
          inputProps: {
            id: props.inputProps.id,
            style: {
              textTransform: 'uppercase',
            },
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
  )
}

export default React.memo(InputText)
