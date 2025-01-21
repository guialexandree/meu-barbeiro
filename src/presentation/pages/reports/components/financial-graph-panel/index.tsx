import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts'
import { Chip, Paper, Stack, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material'

const data = [
  { name: 'Dia 1', entradas: 700, saídas: 120 },
  { name: 'Dia 2', entradas: 800, saídas: 180 },
  { name: 'Dia 3', entradas: 650, saídas: 140 },
  { name: 'Dia 4', entradas: 800, saídas: 170 },
  { name: 'Dia 5', entradas: 580, saídas: 240 },
  { name: 'Dia 6', entradas: 400, saídas: 140 },
  { name: 'Dia 7', entradas: 350, saídas: 190 },
]

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, prefixBadge, value } = props
  return (
    <foreignObject x={x + width / 2 - 20} y={y - 30} width={40} height={24}>
      <Chip
        label={prefixBadge ? `${prefixBadge}${value}` : value}
        size="small"
        sx={{ fontSize: 10, lineHeight: 1 }}
      />
    </foreignObject>
  )
}

export const FinancialGraphPanel: React.FC = () => {
  const theme = useTheme()

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
          <CartesianGrid strokeDasharray="6 6" opacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="entradas" fill={theme.palette.success.main}>
            <LabelList dataKey="entradas" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="saídas" fill={theme.palette.error.main}>
            <LabelList dataKey="saídas" content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
}
