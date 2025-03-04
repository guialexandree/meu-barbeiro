import React from 'react'
import { useRecoilState } from 'recoil'
import { Slider, Stack, Typography } from '@mui/material'
import { State } from '@/presentation/pages/service-form/components/atoms'

export const ServiceFormTimeExecution: React.FC = () => {
  const [timeExecution, setTimeExecution] = useRecoilState(State.timeExecutionState)

  return (
    <Stack px={1} pt={1}>
      <Typography id='input-slider' color='grey.500'>
        Tempo de execução
      </Typography>
      <Slider
        aria-label='Always visible'
        defaultValue={80}
        getAriaValueText={(value) => `${value} minutos`}
        step={5}
        name='timeExecution'
        id='service-time-execution'
        value={timeExecution}
        onChange={(_, value) => {
          setTimeExecution(value as number)
        }}
        valueLabelDisplay='on'
        min={10}
        max={120}
        sx={{
          '& .MuiSlider-valueLabel': {
            top: '52px',
          },
        }}
      />
    </Stack>
  )
}
