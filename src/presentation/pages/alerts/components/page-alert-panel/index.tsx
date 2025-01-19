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
  Slide,
  Stack,
} from '@mui/material'
import { AlertType } from '@/domain/models'

type PageAlertPanelProps = {
  message: string
  type: AlertType
  onAdd: VoidFunction
  onEdit: VoidFunction
  entryDirection: 'up' | 'down' | 'left' | 'right'
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
    <Slide direction={props.entryDirection} in mountOnEnter unmountOnExit>
      <Accordion
        component='article'
        defaultExpanded
        sx={{
          '.MuiAccordionSummary-root': {
            minHeight: 30,
          },
          '.MuiAccordionSummary-content': {
            margin: 1.5,
            ml: 0,
          },
        }}
      >
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
              '&.MuiPaper-elevation': {
                pr: 0,
              },
            }}
          >
            <Stack
              flex={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ pr: props.message ? 0.5 : 1, color: props.message ? 'grey.200' : 'grey.500' }}
            >
              {props.message ? props.message : 'Nenhuma mensagem ativa'}

              {props.message ? (
                <IconButton size="small" onClick={props.onEdit}>
                  <Icon sx={{ fontSize: 16, color: 'grey.500' }}>edit</Icon>
                </IconButton>
              ) : (
                <Link
                  href="#"
                  sx={{ ml: 0.5, color: 'info.main', textDecoration: 'none' }}
                  onClick={props.onAdd}
                >
                  Configurar
                </Link>
              )}
            </Stack>
          </Alert>
        </AccordionDetails>
      </Accordion>
    </Slide>
  )
}
