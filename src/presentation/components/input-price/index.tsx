import React from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import { TextField, TextFieldProps, useMediaQuery, useTheme } from '@mui/material'
import { useFormat } from '@/presentation/hooks'

type InputPriceProps = {
  state: RecoilState<number>
  inputProps: TextFieldProps
}

const InputPrice: React.FC<InputPriceProps> = (props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { formatCoins } = useFormat()
  const [price, setPrice] = useRecoilState(props.state)

  const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    const inputValue = +event.target.value.replace(/\D/g, '')
    setPrice(inputValue)
  }

  return (
    <TextField
      id={props.inputProps.id}
      slotProps={{ input: { id: props.inputProps.id } }}
      size={isMobile ? 'small' : 'medium'}
      inputMode="decimal"
      value={formatCoins(price)}
      onChange={handleChangeNumber}
      label="Preço"
      name="price"
    />
  )
}

export default React.memo(InputPrice)
