import React from 'react'
import { useRecoilState } from 'recoil'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import { Accordion, AccordionDetails, AccordionSummary, Icon, Fade, Stack, Typography, Chip } from '@mui/material'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'

export const HistoryToday: React.FC = () => {
  const [expanded, setExpanded] = useRecoilState(State.expandHistoryState)

  return (
    <Fade in timeout={500} mountOnEnter unmountOnExit style={{ transitionDelay: '250ms' }}>
      <Stack justifyContent="center" mt={1}>
        <Accordion
          variant='outlined'
          expanded={expanded}
          onChange={() => {
            setExpanded((currentState) => !currentState)
          }}
          elevation={0}
        >
          <AccordionSummary sx={{ fontSize: 12 }} expandIcon={<GridExpandMoreIcon fontSize='small' />} aria-controls="panel2-content" id="panel2-header">
            <Icon fontSize='small' color="action" sx={{ mr: 1, color: 'grey.300' }}>
              content_cut
            </Icon>
            <Typography color="grey.200" variant="body2" fontWeight={500} fontFamily="Inter">
              Atendimentos
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
