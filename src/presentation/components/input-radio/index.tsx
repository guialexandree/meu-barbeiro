import { Icon, Paper, Radio, Slide, Stack, Typography } from '@mui/material'

type InputRadioProps<T> = {
  onChange: (newValue: T) => void
  value: T
  label: string
  description: string
  checked: boolean
  children?: React.ReactNode
  icon?: 'north' | 'south'
}

export const InputRadio = <T,>(props: InputRadioProps<T>) => {
  return (
    <Slide direction="up" in timeout={350}>
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          px: 3,
          py: 1.5,
          transition: 'all 0.3s ease',
          backgroundColor: props.checked ? 'background.paper' : 'background.default',
          borderColor: props.checked ? 'grey.500' : 'grey.800',
          position: 'relative',
        }}
        onClick={() => props.onChange(props.value)}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" width={'100%'}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {props.icon && <Icon sx={{ fontSize: 16 }}>{props.icon}</Icon>}
            <Typography variant="body2" fontWeight={500} color={props.checked ? 'text.primary' : 'text.secondary'}>
              {props.label}
            </Typography>
          </Stack>
          <Radio
            checked={props.checked}
            color="success"
            onChange={() => {
              props.onChange(props.value)
            }}
            value={props.value}
            name="position"
            sx={{}}
            slotProps={{
              input: { 'aria-label': 'A', sx: { p: 0 } },
              root: { sx: { py: 0, position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' } },
            }}
          />
        </Stack>
        <Typography variant="caption" color="text.disabled" letterSpacing={1}>
          {props.description}
        </Typography>
        {props.children}
      </Paper>
    </Slide>
  )
}
