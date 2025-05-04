import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Button, Fade, FormControlLabel, Icon, Skeleton, Stack, Typography } from '@mui/material'
import { Factories } from '@/main/factories/usecases'
import { CompanyModel } from '@/domain/models'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { Android12Switch, DialogConfirm } from '@/presentation/components'
import { useNotify } from '@/presentation/hooks'

export const StatusSwitch: React.FC = () => {
  const { notify } = useNotify()
  const setOpen = useSetRecoilState(State.openDialog)
  const setExpandHistory = useSetRecoilState(State.expandHistoryState)
  const [loading, setLoading] = useRecoilState(State.loadingChangeStatusState)
  const [company, setCompany] = useRecoilState(GenericState.companyState)

  const startAttendanceCompany = React.useMemo(() => Factories.makeRemoteStartAttendanceCompany(), [])
  const closedAttendanceCompany = React.useMemo(() => Factories.makeRemoteClosedAttendanceCompany(), [])

  const onSuccess = (company: CompanyModel) => {
    setCompany(company)
    setOpen(false)
    setLoading(false)
  }

  const handleStartAttendance = async () => {
    setLoading(true)
    return startAttendanceCompany
      .start()
      .then((result) => {
        if (result.success) {
          onSuccess(result.data)
          setExpandHistory(false)
          notify('Fila de atendimento iniciada', { type: 'success' })
          return
        }

        notify(result.error, { type: 'error' })
      })
      .catch(console.error)
  }

  const handleEndAttendance = async () => {
    setLoading(true)
    return closedAttendanceCompany
      .closed()
      .then((result) => {
        if (result.success) {
          onSuccess(result.data)
          setExpandHistory(true)
          notify('Fila de atendimento encerrada', { type: 'success' })
          return
        }

        notify(result.error, { type: 'error' })
      })
      .catch(console.error)
  }

  const handleChangeStatus = async () => {
    const action = {
      serving: handleEndAttendance,
      closed: handleStartAttendance,
    }[company?.statusAttendance || 'closed']

    await action()
  }

  const messageStatus = {
    serving:
      'Confirma encerramento da fila de atendimento? Ao encerrar o atendimento, nenhum cliente poderá entrar na fila.',
    closed: 'Confirma abertura da fila de atendimento?',
  }[company?.statusAttendance || 'closed']

  const labelActionStatus = {
    serving: 'encerrar',
    closed: 'iniciar',
  }[company?.statusAttendance || 'closed']

  return (
    <>
      <Fade in unmountOnExit style={{ transitionDelay: '100ms' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h1">FILA</Typography>

          {!company && <Skeleton variant="rounded" width={175} height={37} />}

          {company?.statusAttendance === 'closed' && (
            <Button
              variant="contained"
              color="success"
              loading={loading}
              size="small"
              sx={{
                backgroundColor: 'success.light',
                minWidth: 128,
                fontWeight: '700',
                fontFamily: 'Inter',
              }}
              onClick={() => {
                setOpen(true)
              }}
              endIcon={<Icon>settings_power</Icon>}
            >
              iniciar atendimentos
            </Button>
          )}
          {company?.statusAttendance === 'serving' && (
            <Button
              variant="contained"
              loading={loading}
              size="small"
              sx={{
                fontSize: 12,
                backgroundColor: 'grey.400',
                color: 'grey.900',
                minWidth: 128,
                fontWeight: '700',
                fontFamily: 'Inter',
              }}
              onClick={() => {
                setOpen(true)
              }}
              endIcon={<Icon>power_settings_new</Icon>}
            >
              Encerrar atendimentos
            </Button>
          )}
        </Stack>
      </Fade>

      <DialogConfirm
        icon="info"
        title={company?.statusAttendance === 'closed' ? 'Iniciar atendimentos' : 'Encerrar atendimentos'}
        answer={messageStatus}
        loading={loading}
        onConfirm={handleChangeStatus}
        openState={State.openDialog}
        labelConfirm={labelActionStatus}
      >
        {company?.statusAttendance === 'closed' && (
          <FormControlLabel
            slotProps={{
              typography: { fontSize: 14, fontFamily: 'Inter' },
            }}
            control={<Android12Switch />}
            label="Enviar notificação para os clientes"
          />
        )}
      </DialogConfirm>
    </>
  )
}
