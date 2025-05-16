import React from 'react'
import { Divider, Zoom, Icon, IconButton, Paper, Stack, Typography, Badge, Skeleton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AttendanceModel } from '@/domain/models'
import { GenericState } from '@/presentation/components/atoms'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/templates/admin-template/components/atoms'
import { useNotify, useSocket } from '@/presentation/hooks'
import { TextZoom } from '@/presentation/components'

export const QueueInfo: React.FC = () => {
  const { getSocket } = useSocket()
  const { notify } = useNotify()
  const navigate = useNavigate()
  const company = useRecoilValue(GenericState.companyState)
  const showAmount = useRecoilValue(GenericState.showAmountState)
  const [attendancesInfo, setAttendancesInfo] = useRecoilState(State.attendancesInfoResultState)
  const [loading, setLoading] = useRecoilState(State.loadingState)

  const loadAttendancesInfoToday = React.useMemo(() => Factories.makeRemoteLoadAttendancesInfoToday(), [])
  const pollingInterval = React.useRef<NodeJS.Timeout>()

  const onLoadAttendancesInfoToday = React.useCallback(async () => {
    try {
      const result = await loadAttendancesInfoToday.load()
      if (!result.success) {
        notify('Error loading attendance info:', { type: 'error' })
        return
      }
      setAttendancesInfo(result.data)
    } catch (error) {
      console.error('Error loading attendance info:', error)
    }
  }, [loading])

  const onLoad = React.useCallback(async () => {
    try {
      setLoading(true)
      const result = await loadAttendancesInfoToday.load()
      if (!result.success) {
        notify('Error loading attendance info:', { type: 'error' })
        return
      }
      setAttendancesInfo(result.data)
    } catch (error) {
      console.error('Error loading attendance info:', error)
    } finally {
      setLoading(false)
    }
  }, [loading])

  React.useEffect(() => {
    onLoad()

    // const socket = getSocket()

    // socket.on('connect', () => {
    //   if (pollingInterval.current) {
    //     clearInterval(pollingInterval.current)
    //   }
    // })

    // socket.on('disconnect', () => {
    //   pollingInterval.current = setInterval(() => {
    //     onLoadAttendancesInfoToday()
    //   }, 30000)
    // })

    // socket.on('queue_info/entry_in_queue', () => {
    //   setAttendancesInfo((currentState) => ({
    //     ...currentState,
    //     inQueue: currentState.inQueue  + 1,
    //   }))
    // })
    // socket.on('queue_info/cancel_attendance', () => {
    //   setAttendancesInfo((currentState) => ({
    //     ...currentState,
    //     inQueue: currentState.inQueue  - 1,
    //   }))
    // })

    // socket.on('queue_info/finish_attendance', (attendance: AttendanceModel) => {
    //   setAttendancesInfo((currentState) => ({
    //     inQueue: currentState.inQueue - 1,
    //     amount: currentState.amount + attendance?.services?.reduce((acc, service) => acc + +service.price, 0),
    //     finished: currentState.finished + 1,
    //   }))
    // })

    return () => {
      // socket.off('queue_info/entry_in_queue')
      // socket.off('queue_info/cancel_attendance')
      // socket.off('queue_info/finish_attendance')
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current)
      }
    }
  }, [])

  return (
    <Zoom in timeout={300} style={{ transitionDelay: '250ms' }} unmountOnExit>
      <Paper
        component="header"
        elevation={0}
        sx={{
          backgroundColor: 'primary.light',
          backgroundImage: 'linear-gradient(0deg,rgba(44, 130, 216, 1) 0%, #4b91d8 60%)',
          borderRadius: 1,
          flexGrow: 1,
          alignItems: 'flex-start',
          display: 'flex',
          justifyContent: 'space-between',
          padding: 1,
          px: 1.5,
          mb: 0.5,
        }}
      >
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton
            size="large"
            sx={{ p: 0 }}
            onClick={() => {
              navigate('/')
            }}
          >
            <Badge
              variant="dot"
              color={company?.statusAttendance === 'serving' ? 'success' : 'error'}
              overlap="circular"
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              badgeContent={company ? 1 : 0}
            >
              <Icon>sort</Icon>
            </Badge>
          </IconButton>

          <Stack spacing={0.5}>
            <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: '300', fontSize: 12 }}>
              Status
            </Typography>
            {loading && !attendancesInfo.amount && <Skeleton variant="rounded" width={54} height={14} />}
            {!loading && company?.statusAttendance === 'serving' && (
              <Zoom in unmountOnExit>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  {!!attendancesInfo.inQueue && <TextZoom text={attendancesInfo.inQueue} />}
                  <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '500', fontSize: 14 }}>
                    {attendancesInfo.inQueue ? 'na fila' : 'Aberta'}
                  </Typography>
                </Stack>
              </Zoom>
            )}
            {!loading && company?.statusAttendance === 'closed' && (
              <Zoom in unmountOnExit>
                <Typography variant="subtitle1" sx={{ mt: 0, lineHeight: 1, fontWeight: '500', fontSize: 14 }}>
                  encerrada
                </Typography>
              </Zoom>
            )}
          </Stack>
        </Stack>

        <Divider orientation="vertical" flexItem />
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton
            size="large"
            sx={{ p: 0 }}
            onClick={() => {
              navigate('/')
            }}
          >
            <Icon>content_cut</Icon>
          </IconButton>

          <Stack spacing={0.5}>
            <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: '300', fontSize: 12 }}>
              Atendimentos
            </Typography>

            {loading && !attendancesInfo.amount && <Skeleton variant="rounded" width={78} height={14} />}

            <Zoom in unmountOnExit>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                {!loading && <TextZoom text={attendancesInfo.finished} />}

                {!loading && (
                  <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '500', fontSize: 14 }}>
                    realizados
                  </Typography>
                )}
              </Stack>
            </Zoom>
          </Stack>
        </Stack>

        <Divider orientation="vertical" flexItem />

        <Stack spacing={0.5}>
          <Typography variant="subtitle2" sx={{ lineHeight: 1, fontWeight: '300', fontSize: 12 }}>
            Saldo do dia
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '600', fontSize: 14 }}>
              R$
            </Typography>
            {!attendancesInfo.amount && loading && <Skeleton variant="rounded" width={30} height={14} />}
            {!loading && <TextZoom text={showAmount ? attendancesInfo.amount?.toFixed(0) || 0 : '****'} />}
          </Stack>
        </Stack>
      </Paper>
    </Zoom>
  )
}
