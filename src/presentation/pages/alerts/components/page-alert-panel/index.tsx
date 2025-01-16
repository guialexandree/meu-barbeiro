import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Chip,
  Icon,
  IconButton,
  Link,
  Stack,
} from '@mui/material'
import { AlertType } from '@/domain/models'

type PageAlertPanelProps = {
  message: string
  type: AlertType
  onAdd: VoidFunction
  onRemove: VoidFunction
}

export const PageAlertPanel: React.FC<PageAlertPanelProps> = (props) => {
  const labelType = {
    home: 'home',
    services: 'serviços',
    prices: 'tabela de preços',
    history: 'histórico',
  }[props.type]

  const iconType = {
    home: 'home',
    services: 'build',
    prices: 'build',
    history: 'history',
  }[props.type]

  const colorType = {
    home: 'secondary',
    services: 'success',
    prices: 'success',
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
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<Icon>expand_more</Icon>}
        aria-controls={`panel-content-${props.type}`}
        id={`panel-header-${props.type}`}
      >
        <Chip
          icon={<Icon>{iconType}</Icon>}
          color={colorType}
          label={labelType}
          size="small"
        />
      </AccordionSummary>
      <AccordionDetails sx={{ p: 2, pt: 0 }}>
        <Alert
          severity={props.message ? 'success' : 'warning'}
          variant="outlined"
          sx={{
            fontSize: 12,
            mt: 1,
            color: 'grey.500',
            borderColor: (theme) => `${theme.palette.grey[800]}80`,
            py: 0,
            '.MuiAlert-message': {
              flex: 1,
            },
          }}
        >
          <Stack
            flex={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {props.message ? props.message : 'Nenhuma mensagem ativa'}

            {props.message ? (
              <IconButton size="small" onClick={props.onRemove}>
                <Icon sx={{ fontSize: 18, color: 'grey.500' }}>delete</Icon>
              </IconButton>
            ) : (
              <Link
                href="#"
                sx={{ ml: 0.5, color: 'info.main', textDecoration: 'none' }}
                onClick={props.onAdd}
              >
                Adicionar nova
              </Link>
            )}
          </Stack>
        </Alert>
      </AccordionDetails>
    </Accordion>
  )
}
