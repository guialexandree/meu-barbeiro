import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import { TextField, TextFieldProps, useMediaQuery, useTheme } from '@mui/material'

type InputTextProps = {
  state: RecoilState<string>
  inputProps: TextFieldProps
}

 const InputText: React.FC<InputTextProps> = (props) => {
  const [text, setText] = useRecoilState(props.state)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setText(event.target.value)
  }

  return (
    <TextField
      size={isMobile ? 'small' : 'medium'}
      value={text}
      onChange={handleChange}
      slotProps={{
        input: {
          inputProps: {
            style: {
              textTransform: 'uppercase'
            }
          }
        },
      }}
      {...props.inputProps}
    />
  )
}

export default React.memo(InputText)
