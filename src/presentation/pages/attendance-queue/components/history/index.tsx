import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Icon,
  Fade,
  Stack,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { Factories } from '@/main/factories/usecases'
import { useNotify } from '@/presentation/hooks'

export const HistoryToday: React.FC = () => {
  const { notify } = useNotify()
  const [expanded, setExpanded] = useRecoilState(State.expandHistoryState)
  const [loading, setLoading] = useRecoilState(State.History.loadingState)
  const setDoneAttendances = useSetRecoilState(State.History.doneAttendancesState)

  const loadDoneAttendances = React.useMemo(() => Factories.makeRemoteLoadDoneAttendances(), [])

  const onLoadDoneAttendances = async () => {
    setLoading(true)
    return loadDoneAttendances
      .load()
      .then((result) => {
        if (result.success) {
          setDoneAttendances(result.data)
          return
        }

        notify(result.error, { type: 'error' })
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  React.useEffect(() => {
    onLoadDoneAttendances()
  }, [])

  return (
    <Fade in timeout={500} mountOnEnter unmountOnExit style={{ transitionDelay: '250ms' }}>
      <Stack justifyContent="center" mt={1}>
        <Accordion
          variant="outlined"
          expanded={expanded}
          onChange={() => {
            setExpanded((currentState) => !currentState)
          }}
        >
          <AccordionSummary
            sx={{ fontSize: 12 }}
            expandIcon={<GridExpandMoreIcon fontSize="small" />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Icon fontSize="small" color="action" sx={{ mr: 1, color: 'grey.300' }}>
              content_cut
            </Icon>
            <Typography color="grey.200" variant="body2" fontWeight={500} fontFamily="Inter">
              Atendimentos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Chip
              icon={
                loading ? (
                  <CircularProgress
                    size={20}
                    sx={{
                      color: 'grey.300',
                    }}
                  />
                ) : (
                  <Icon color="disabled">playlist_remove</Icon>
                )
              }
              variant="outlined"
              color="default"
              sx={{ color: 'text.secondary' }}
              label={loading ? 'Buscando atendimentos' : "Nenhum atendimento hoje"}
            />
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Fade>
  )
}
