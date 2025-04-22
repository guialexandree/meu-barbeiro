import React from 'react'
import { useRecoilState } from 'recoil'
import { Alert, Paper, Slide, Slider, Stack, Typography } from '@mui/material'
import { State } from '@/presentation/pages/service-form/components/atoms'

export const TimeExecution: React.FC = () => {
  const [timeExecution, setTimeExecution] = useRecoilState(State.timeExecutionState)

  return (
    <Slide direction="up" in style={{ transitionDelay: '100ms' }} unmountOnExit>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: (theme) => `${theme.palette.primary.light}10`,
        }}
      >
        <Stack>
          <Typography variant="body2" fontWeight={500} sx={{ ml: 1, fontFamily: 'Inter' }}>
            Tempo de execução(minutos)
          </Typography>
          <Stack pr={5} pl={1}>
            <Slider
              aria-label="Always visible"
              defaultValue={80}
              getAriaValueText={(value) => `${value} minutos`}
              step={5}
              name="timeExecution"
              color="primary"
              id="service-time-execution"
              value={timeExecution}
              onChange={(_, value) => {
                setTimeExecution(value as number)
              }}
              valueLabelDisplay="on"
              min={10}
              max={120}
              sx={{
                '& .MuiSlider-valueLabel': {
                  top: '24px',
                  left: '130%',
                  fontSize: 12,
                  px: 1,
                },
                '& .MuiSlider-valueLabel::before': {
                  display: 'none',
                },
              }}
            />
          </Stack>

          <Alert severity="info" variant="outlined">
            O tempo de execução será usado para calcular os próximos atendimentos na fila. Informar o tempo em minutos.
          </Alert>
        </Stack>
      </Paper>
    </Slide>
  )
}
