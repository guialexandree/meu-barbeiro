import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { GridExpandMoreIcon } from '@mui/x-data-grid'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Icon,
  Grow,
  Stack,
  Typography,
  Chip,
  CircularProgress,
  Skeleton,
} from '@mui/material'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { Factories } from '@/main/factories/usecases'
import { useNotify } from '@/presentation/hooks'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineConnector,
} from '@mui/lab'
import { GenericState } from '@/presentation/components/atoms'

export const HistoryToday: React.FC = () => {
  const { notify } = useNotify()
  const dateAdapter = useRecoilValue(GenericState.dateAdapterState)
  const [expanded, setExpanded] = useRecoilState(State.expandHistoryState)
  const [loading, setLoading] = useRecoilState(State.History.loadingState)
  const [doneAttendances, setDoneAttendances] = useRecoilState(State.History.doneAttendancesState)
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

    // const socket = getSocket()
    // socket.on('queue/finish_attendance', (attendance: AttendanceModel) => {
    //   setDoneAttendances((currentState) => [
    //     {
    //       ...attendance,
    //       amount: attendance.services.reduce((acc, service) => acc + +service.price, 0),
    //       timeService: dateAdapter.diffInMinutes(attendance.startedAt, attendance.finishedAt!),
    //     },
    //     ...currentState,
    //   ])
    // })

    // socket.on('queue/cancel_attendance', (attendance: AttendanceModel) => {
    //   setDoneAttendances((currentState) => [
    //     {
    //       ...attendance,
    //       amount: 0,
    //       timeService: dateAdapter.diffInMinutes(attendance.startedAt, attendance.canceledAt!),
    //     },
    //     ...currentState,
    //   ])
    // })

    return () => {
      // socket.off('queue/finish_attendance')
      // socket.off('queue/cancel_attendance')
    }
  }, [])

  if (loading) {
    return <Grow  in>
      <Skeleton variant="rounded" width="100%" height={48} sx={{ borderRadius: 1 }} />
    </Grow>
  }

  if (!doneAttendances.length) {
    return null
  }

  return (
    <Grow in timeout={500} mountOnEnter unmountOnExit style={{ transitionDelay: '250ms' }}>
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
          <AccordionDetails sx={{ pb: 0 }}>
            <Timeline
              sx={{
                [`& .${timelineOppositeContentClasses.root}`]: {
                  flex: 0.1,
                },
                px: 0,
                py: 0,
              }}
            >
              {doneAttendances?.map((attendance, index) => (
                <Grow key={`history-item-${attendance.id}`} in style={{ transitionDelay: `${index * 50}ms` }} unmountOnExit>
                  <TimelineItem key={`history-item-${attendance.id}`} sx={{ minHeight: 40 }}>
                    <TimelineOppositeContent color="textSecondary" sx={{ fontSize: 14, pt: 0 }}>
                      {dateAdapter.format((attendance.finishedAt || attendance.canceledAt)!, 'HH:mm')}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        sx={{
                          boxShadow: 'none',
                          backgroundColor: (theme) =>
                            attendance.status === 'canceled'
                              ? `${theme.palette.error.light}20`
                              : `${theme.palette.success.light}20`,
                          m: 0,
                          p: 0
                        }}
                      >
                        <Icon
                          fontSize="small"
                          sx={{
                            color: attendance.status === 'canceled' ? 'error.main' : 'success.main',
                            fontSize: 16,
                          }}
                        >
                          {attendance.status === 'canceled' ? 'close' : 'check'}
                        </Icon>
                      </TimelineDot>
                      <TimelineConnector sx={{ width: '1px', backgroundColor: 'grey.600' }} />
                    </TimelineSeparator>
                    <TimelineContent sx={{ textTransform: 'uppercase', pt: 0 }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" flex={1} sx={{ color: attendance.status === 'canceled' ? 'text.secondary' : 'text.primary' }}>
                        {attendance.user.name}
                        {attendance.status === 'canceled' && (
                          <Chip
                            label="PERDEU A VEZ"
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{
                              fontSize: 10,
                              py: 0.4,
                              height: 'auto',
                              minWidth: 84,
                              backgroundColor: (theme) => `${theme.palette.error.light}20`,
                            }}
                          />
                        )}

                        {attendance.status === 'finished' && (
                          <Chip
                            label={`${dateAdapter.diffInMinutes(attendance.startedAt, attendance.finishedAt)} min`}
                            variant="outlined"
                            color='success'
                            size="small"
                            sx={{
                              fontSize: 10,
                              py: 0.4,
                              height: 'auto',
                              minWidth: 84,
                              backgroundColor: (theme) => `${theme.palette.success.light}20`,
                            }}
                          />
                        )}
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                </Grow>
              ))}
            </Timeline>

            {!doneAttendances?.length && (
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
                label={loading ? 'Buscando atendimentos' : 'Nenhum atendimento hoje'}
              />
            )}
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Grow>
  )
}
