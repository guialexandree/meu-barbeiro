import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { Accordion, AccordionDetails, AccordionSummary, Icon, Fade, Stack, Typography, Chip } from '@mui/material'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'

export const HistoryToday: React.FC = () => {
  const [expanded, setExpanded] = useRecoilState(State.expandHistoryState)
  const company = useRecoilValue(GenericState.companyState)

  if (company?.statusAttendance !== 'serving') {
    return null
  }

  return (
    <Fade in timeout={500} mountOnEnter unmountOnExit style={{ transitionDelay: '250ms' }}>
      <Stack justifyContent="center">
        <Accordion
          expanded={expanded}
          onChange={() => {
            setExpanded((currentState) => !currentState)
          }}
          elevation={0}
        >
          <AccordionSummary expandIcon={<GridExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
            <Icon color="action" sx={{ mr: 1, color: 'grey.300' }}>
              history
            </Icon>
            <Typography color="grey.200" variant="body2" fontWeight={500} fontFamily="Inter">
              Histórico do dia
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
              <Chip icon={<Icon color='disabled'>playlist_remove</Icon>} variant='outlined' color='default' sx={{ color: 'text.secondary'}} label="Nenhum atendimento hoje" />
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Fade>
  )
}
