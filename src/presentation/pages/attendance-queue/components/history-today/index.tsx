import React from 'react'
import { useRecoilState } from 'recoil'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { Accordion, AccordionDetails, AccordionSummary, Icon, Fade, Stack, Typography } from '@mui/material'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'

export const HistoryToday: React.FC = () => {
  const [expanded, setExpanded] = useRecoilState(State.expandHistoryState)

  return (
    <Fade in timeout={500} mountOnEnter unmountOnExit style={{ transitionDelay: '250ms' }}>
      <Stack justifyContent="center">
        <Accordion expanded={expanded} variant="outlined" onChange={() => { setExpanded(currentState => !currentState) }} elevation={0}>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Icon color="action" sx={{ mr: 1, color: 'grey.300' }}>
              history
            </Icon>
            <Typography color="grey.200" variant="body2" fontWeight={500} fontFamily="Inter">
              Histórico do dia
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Fade>
  )
}
