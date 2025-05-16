import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { AttendanceModel } from '@/domain/models'
import { Factories } from '@/main/factories/usecases'
import { Action } from '@/infra'
import { List } from '@/presentation/components'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { Box, Button, Fade, Icon, Paper, Stack, Typography, Zoom } from '@mui/material'
import { AttendanceItem } from '../attendance-item'
import { useSocket } from '@/presentation/hooks'
import barberImg from '@/presentation/assets/logo.png'

type AttendanceQueueListProps = {
  onReload: VoidFunction
}

export const AttendanceQueueList: React.FC<AttendanceQueueListProps> = (props) => {
  const navigate = useNavigate()
  const { getSocket, getActions } = useSocket()
  const [attendancesResult, setAttendancesResult] = useRecoilState(State.List.attendancesResultState)
  const setOpenWhatsAppDialog = useSetRecoilState(State.List.openDialogWhatsAppState)
  const company = useRecoilValue(GenericState.companyState)

  const loadAttendances = React.useMemo(() => Factories.makeRemoteLoadAttendances(), [])
  const pollingInterval = React.useRef<NodeJS.Timeout>()

  const onLoadAttendances = React.useCallback(async () => {
    try {
      const result = await loadAttendances.load()
      setAttendancesResult(result)
    } catch (error: any) {
      console.error(error)
    }
  }, [])

  React.useEffect(() => {
    const socket = getSocket()
    const actions = getActions()

    socket.on('connect', () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current)
      }
    })

    socket.on('queue/entry_in_queue', (attendance: AttendanceModel) => {
      const action: Action = { attendanceId: attendance.id, type: 'inQueue' }
      const hasAction = actions.hasAction(action)
      if (hasAction) {
        actions.removeAction(action)
        return
      }

      setAttendancesResult((currentState) => ({
        ...currentState,
        data: currentState.data.length ? [...currentState.data, attendance] : [{ ...attendance, status: 'current' }],
      }))
    })

    socket.on('disconnect', () => {
      onLoadAttendances()
      pollingInterval.current = setInterval(() => {
        onLoadAttendances()
      }, 30000)
    })

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current)
      }
      socket.off('queue/entry_in_queue')
    }
  }, [])

  if (company?.statusAttendance === 'closed' && attendancesResult?.data?.length == 1) {
    return null
  }

  if (!attendancesResult?.data?.length || attendancesResult?.data?.length === 1) {
    return (
      <Fade in timeout={1000} style={{ transitionDelay: '100ms' }} unmountOnExit>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            my: 3,
            mt: 1,
            mx: 2,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            border: 'none',
            backgroundColor: 'background.default',
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Zoom in style={{ transitionDelay: '200ms' }} unmountOnExit>
              <Box component="img" height={120} width={120} src={barberImg} sx={{ opacity: 0.3 }} />
            </Zoom>
            <Typography
              mt={2}
              sx={{ color: 'info.main', fontSize: 18 }}
              variant="h6"
              fontWeight={600}
              fontFamily="Inter"
            >
              Nenhum cliente na fila
            </Typography>
            <Button
              color="primary"
              id="user-create-action"
              fullWidth
              variant="contained"
              onClick={() => {
                navigate('/fila/entrar')
              }}
              sx={{
                boxShadow: 0,
                borderRadius: 8,
                border: 'solid 1px',
                borderColor: 'primary.dark',
                fontSize: 16,
                fontWeight: 600,
              }}
              startIcon={<Icon sx={{ mr: 1, fontSize: 24, color: 'primary.dark' }}>data_saver_on</Icon>}
            >
              adicionar cliente
            </Button>
          </Stack>
        </Paper>
      </Fade>
    )
  }

  return (
    <Stack justifyContent="center">
      <Typography mx={2} mt={2} mb={1} variant="h2">
        PRÓXIMOS NA FILA
      </Typography>

      <List
        id="attendance-queue-list"
        onReload={props.onReload}
        listState={State.listState}
        messagesStates={{
          noResults: `Nenhum cliente na fila`,
          error: 'Erro ao carregar fila de atendimento',
        }}
      >
        {attendancesResult?.data?.slice(1)?.map((attendance, index) => (
          <Fade in timeout={700} style={{ transitionDelay: `${index * 100}ms` }} key={attendance.id}>
            <Box sx={{ width: '100%' }}>
              <AttendanceItem
                position={index + 1}
                openDialogWhatsapp={() => {
                  setOpenWhatsAppDialog(true)
                }}
                attendance={attendance}
              />
            </Box>
          </Fade>
        ))}
      </List>
    </Stack>
  )
}
