import React from 'react'
import { Alert, Chip, Icon, Link, Paper } from '@mui/material'
import { AlertType } from '@/domain/models'

type PageAlertPanelProps = {
  message: string
  type: AlertType
  onAdd: VoidFunction
}

export const PageAlertPanel: React.FC<PageAlertPanelProps> = (props) => {
  const labelType = {
    home: 'home',
    services: 'serviços',
    history: 'histórico',
  }[props.type]

  const iconType = {
    home: 'home',
    services: 'build',
    history: 'history',
  }[props.type]

  const colorType = {
    home: 'secondary',
    services: 'success',
    history: 'primary',
  }[props.type] as
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'

  return (
    <Paper
      sx={{
        mx: 2,
        mb: 2,
        p: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Chip
        icon={<Icon>{iconType}</Icon>}
        color={colorType}
        label={labelType}
        size="small"
      />
      <Alert
        severity="info"
        variant="outlined"
        sx={{
          fontSize: 12,
          mt: 1,
          color: 'grey.500',
          borderColor: 'grey.800',
          py: 0,
        }}
      >
        Nenhuma mensagem ativa
        <Link href="#" sx={{ ml: 0.5, color: 'info.main'}} onClick={props.onAdd}>Adicionar nova</Link>
      </Alert>
    </Paper>
  )
}
