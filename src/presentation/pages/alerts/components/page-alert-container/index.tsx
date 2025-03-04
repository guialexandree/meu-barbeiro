import React from 'react'
import { RecoilState } from 'recoil'
import { Accordion, AccordionDetails, AccordionSummary, Chip, Icon, Slide } from '@mui/material'
import { AlertModel, AlertType } from '@/domain/models'
import { PageAlertContent } from '@/presentation/pages/alerts/components'

type PageAlertProps = {
  type: AlertType
  entryDirection: 'up' | 'down' | 'left' | 'right'
  alertState: RecoilState<AlertModel>
}

export const PageAlert: React.FC<PageAlertProps> = (props) => {
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
  }[props.type] as 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

  return (
    <Slide direction={props.entryDirection} in mountOnEnter unmountOnExit>
      <Accordion
        component="article"
        id={`${props.type}-alert-panel`}
        defaultExpanded
        sx={{
          '.MuiAccordionSummary-root': {
            minHeight: { xs: 24, sm: 40 },
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
          <Chip icon={<Icon>{iconType}</Icon>} color={colorType} label={labelType} size="small" />
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2, pt: 0 }}>
          <PageAlertContent alertState={props.alertState} type={props.type} />
        </AccordionDetails>
      </Accordion>
    </Slide>
  )
}
