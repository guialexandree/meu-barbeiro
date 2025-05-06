import React from 'react'
import { Divider, Zoom, Icon, IconButton, Paper, Stack, Typography, Badge, Skeleton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { AttendanceModel } from '@/domain/models'
import { GenericState } from '@/presentation/components/atoms'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/templates/admin-template/components/atoms'
import { useNotify } from '@/presentation/hooks'
import { io, Socket } from 'socket.io-client'
import { TextZoom } from '@/presentation/components'

export const QueueInfo: React.FC = () => {
  const { notify } = useNotify()
  const navigate = useNavigate()
  const company = useRecoilValue(GenericState.companyState)
  const showAmount = useRecoilValue(GenericState.showAmountState)
  const [attendancesInfo, setAttendancesInfo] = useRecoilState(State.attendancesInfoResultState)

  const loadAttendancesInfoToday = React.useMemo(() => Factories.makeRemoteLoadAttendancesInfoToday(), [])

  const onLoadAttendancesInfoToday = async () => {
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
  }

  React.useEffect(() => {
    onLoadAttendancesInfoToday()

    const socket: Socket = io('http://meubarbeiro.site:3000/attendances', {
      transports: ['websocket'],
    })

    // Escutar mensagens do servidor
    socket.on('connect', () => {
      onLoadAttendancesInfoToday()
      console.log('Conectado ao WebSocket')
    })

    socket.on('add', (attendance: AttendanceModel) => {
      console.log('Adicionado na fila recebida:', attendance)
      setAttendancesInfo(currentState => ({
        ...currentState,
        inQueue: currentState.inQueue + 1,
      }))
    })

    socket.on('finish', (attendance: AttendanceModel) => {
      console.log('Encerrado na fila recebida:', attendance)
      setAttendancesInfo(currentState => ({
        ...currentState,
        inQueue: currentState.inQueue - 1,
        amount: currentState.amount + attendance.services.reduce((acc, service) => acc + (+service.price), 0),
        finished: currentState.finished + 1,
      }))
    })

    // Lidar com desconexão
    socket.on('disconnect', () => {
      console.warn('Socket desconectado')
      onLoadAttendancesInfoToday()
    })

    // Limpar conexão ao desmontar o componente
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <Zoom in timeout={300} style={{ transitionDelay: '250ms' }} unmountOnExit>
      <Paper
        component="header"
        elevation={0}
        sx={{
          backgroundColor: 'primary.light',
          backgroundImage: 'linear-gradient(0deg,rgba(44, 130, 216, 1) 0%, #569bdf 60%)',
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
            {!attendancesInfo && <Skeleton variant="rounded" width={54} height={14} />}
            {attendancesInfo && company?.statusAttendance === 'serving' && (
              <Zoom in unmountOnExit>
                <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '500', fontSize: 14 }}>
                  {attendancesInfo?.inQueue ? `${attendancesInfo?.inQueue} na fila` : 'Aberta'}
                </Typography>
              </Zoom>
            )}
            {attendancesInfo && company?.statusAttendance === 'closed' && (
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

            {!attendancesInfo && <Skeleton variant="rounded" width={78} height={14} />}

            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                {!!attendancesInfo && (
                  <Zoom in unmountOnExit>
                    <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '500', fontSize: 14 }}>
                      {attendancesInfo?.finished || 0}
                    </Typography>
                  </Zoom>
                )}

                {!!attendancesInfo && (
                  <Zoom in unmountOnExit>
                    <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '500', fontSize: 14 }}>
                      realizados
                    </Typography>
                  </Zoom>
                )}
              </Stack>
            </Stack>
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
            {!attendancesInfo && <Skeleton variant="rounded" width={30} height={14} />}
            {!!attendancesInfo && (
              <TextZoom text={showAmount ? (attendancesInfo?.amount.toFixed(0) || 0) : '****'} />
              // <Zoom in style={{ transitionDelay: '200ms' }} unmountOnExit>
              //   <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '600', fontSize: 14 }}>
              //     {(+attendancesInfo?.amount)?.toFixed(0) || 0}
              //   </Typography>
              // </Zoom>
            )}
            {/* {!!attendancesInfo && !showAmount && (
              <Zoom in style={{ transitionDelay: '200ms', }} unmountOnExit>
                <Typography variant="subtitle1" sx={{ lineHeight: 1, fontWeight: '600', fontSize: 14 }}>
                  ****
                </Typography>
              </Zoom>
            )} */}
          </Stack>
        </Stack>
      </Paper>
    </Zoom>
  )
}
