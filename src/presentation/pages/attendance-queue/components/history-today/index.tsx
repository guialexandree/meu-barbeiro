import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Icon, Slide, Stack, Typography } from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'

export const HistoryToday: React.FC = () => {
  return (
    <Slide in direction="left" timeout={500} mountOnEnter unmountOnExit>
      <Stack justifyContent="center">
        <Accordion variant="outlined" elevation={0}>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            sx={{
              borderRadius: 30,
            }}
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
    </Slide>
  )
}
