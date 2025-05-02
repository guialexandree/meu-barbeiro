import { Fade, FormControlLabel, Paper, Radio, Typography } from '@mui/material'

type InputRadioProps<T> = {
  onChange: (newValue: T) => void
  value: T
  label: string
  description: string
  checked: boolean
  children?: React.ReactNode
}

export const InputRadio = <T,>(props: InputRadioProps<T>) => {
  return (
    <Fade in timeout={300}>
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          p: 2,
          transition: 'all 0.3s ease',
          backgroundColor: props.checked ? 'background.paper' : 'background.default',
          borderColor: props.checked ? 'grey.300' : 'grey.800',
        }}
        elevation={0}
        onClick={() => props.onChange(props.value)}
      >
        <FormControlLabel
          label={props.label}
          value={props.label}
          slotProps={{
            typography: { fontWeight: '600', color: props.checked ? 'text.primary' : 'text.secondary' },
          }}
          control={
            <Radio
              checked={props.checked}
              onChange={() => {
                props.onChange(props.value)
              }}
              value={props.value}
              name="position"
              slotProps={{ input: { 'aria-label': 'A', sx: { p: 0 } }, root: { sx: { py: 0 } } }}
            />
          }
        />
        <Typography variant="caption" color="text.disabled" letterSpacing={1}>
          {props.description}
        </Typography>
        {props.children}
      </Paper>
    </Fade>
  )
}
