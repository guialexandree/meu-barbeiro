import React from 'react'
import { useRecoilValue } from 'recoil'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts'
import { Chip, Paper, Stack, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material'
import { GenericState } from '@/presentation/components/atoms'

const data = [
  { name: 'Dia 1', atendimentos: 12 },
  { name: 'Dia 2', atendimentos: 15 },
  { name: 'Dia 3', atendimentos: 10 },
  { name: 'Dia 4', atendimentos: 8 },
  { name: 'Dia 5', atendimentos: 20 },
  { name: 'Dia 6', atendimentos: 18 },
  { name: 'Dia 7', atendimentos: 22 },
]

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, prefixBadge, value } = props
  return (
    <foreignObject x={x + width / 2 - 20} y={y - 30} width={40} height={24}>
      <Chip label={prefixBadge ? `${prefixBadge }${value}` : value} size="small" sx={{ fontSize: 10 }} />
    </foreignObject>
  )
}

export const AttendancesGraphPanel: React.FC = () => {
  const theme = useTheme()
  const companyState = useRecoilValue(GenericState.companyState)

  if (companyState?.statusAttendance !== 'closed') {
    return null
  }

  return (
    <Paper
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        position: 'relative',
        mx: 2,
        mt: { xs: 2, sm: 4 },
        py: 1,
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mt={1} mr={2}>
        <ToggleButtonGroup color="primary" size="small" value={'web'} exclusive aria-label="Platform">
          <ToggleButton value="web">7 dias</ToggleButton>
          <ToggleButton value="android">15 dias</ToggleButton>
          <ToggleButton value="ios">1 mês</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 36, right: 30, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="6 6" opacity={.2} />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='atendimentos' fill={theme.palette.secondary.main}>
            <LabelList dataKey='atendimentos' content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
}
