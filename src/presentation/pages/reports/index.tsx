import React from 'react'
import { PageContainer, PageTitle, ValueIndicator } from '@/presentation/components'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts'
import reportsHeaderImg from '@/presentation/assets/reports-header.png'
import { Stack, useTheme } from '@mui/material'

const data = [
  { name: 'Dia 1', atendimentos: 12 },
  { name: 'Dia 2', atendimentos: 15 },
  { name: 'Dia 3', atendimentos: 10 },
  { name: 'Dia 4', atendimentos: 8 },
  { name: 'Dia 5', atendimentos: 20 },
  { name: 'Dia 6', atendimentos: 18 },
  { name: 'Dia 7', atendimentos: 22 },
]

const dataValues = [
  { name: 'Dia 1', ['R$']: 1200 },
  { name: 'Dia 2', ['R$']: 2000 },
  { name: 'Dia 3', ['R$']: 1250 },
  { name: 'Dia 4', ['R$']: 800 },
  { name: 'Dia 5', ['R$']: 580 },
  { name: 'Dia 6', ['R$']: 1000 },
  { name: 'Dia 7', ['R$']: 1580 },
]

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#939395" />
      <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
        {value.split(' ')[1]}
      </text>
    </g>
  );
};

const ReportsPage: React.FC = () => {
  const theme = useTheme()

  return (
    <PageContainer>
      <PageTitle
        title="Relatórios"
        subtitle="Acompanhe a fila de atendimento"
        icon={reportsHeaderImg}
      />

    <Stack direction="row" mx={2} spacing={1}>
      <ValueIndicator
        title="Atendimentos hoje"
        value={14}
        entryDirection='right'
        icon='peoples'
      />
      <ValueIndicator
        title="Saldo do dia"
        value={'R$ 550'}
        entryDirection='right'
        icon='peoples'
      />

    </Stack>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="atendimentos" fill={theme.palette.secondary.main} />
      </BarChart>
    </ResponsiveContainer>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dataValues} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="R$" fill={theme.palette.success.main}>
          <LabelList dataKey="name" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </PageContainer>
  )
}

export default ReportsPage
