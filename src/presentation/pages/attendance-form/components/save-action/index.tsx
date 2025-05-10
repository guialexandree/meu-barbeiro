import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate, useParams } from 'react-router-dom'
import { Factories } from '@/main/factories/usecases'
import { AttendanceModel } from '@/domain/models'
import { Button, Icon, Slide } from '@mui/material'
import { useNotify } from '@/presentation/hooks'
import { State } from '@/presentation/pages/attendance-form/components/atoms'
import { PageLoader } from '@/presentation/components'

type SaveFormActionProps = {
  onReset: VoidFunction
}

export const SaveFormAction: React.FC<SaveFormActionProps> = (props) => {
  const { notify } = useNotify()
  const navigate = useNavigate()
  const newAttendance = useRecoilValue(State.newAttendandeState)
  const [loading, setLoading] = useRecoilState(State.loadingState)

  const { id } = useParams<{ id: string }>()

  const addAttendanceInQueue = React.useMemo(() => Factories.makeRemoteAddAttendanceInQueue(), [])

  const onSuccess = (attendance: AttendanceModel): void => {
    navigate('/')
    notify(`${attendance.user.name.toUpperCase()} foi adicionado na fila`, { type: 'info' })
    props.onReset()
  }

  const onError = (error: string, inputName: string): void => {
    if (inputName === 'name') {
      // setName((currentState) => ({ ...currentState, error }))
      return
    }

    notify(error, { type: 'error' })
  }

  const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    handleAddAttendanceInQueue()
  }

  const handleAddAttendanceInQueue = (): void => {
    setLoading(true)
    addAttendanceInQueue
      .add(newAttendance)
      .then((result) => {
        if (result.success) {
          onSuccess(result.data)
          return
        }

        onError(result.error, 'client')
      })
      .catch(() => {
        notify('Erro ao criar serviço', { type: 'error' })
      })
      .finally(() => setLoading(false))
  }

  if (id) {
    return undefined
  }

  if (loading) {
    return <PageLoader loading title='Adicionando na fila' />
  }

  return (
    <Slide in direction="left" unmountOnExit mountOnEnter style={{ transitionDelay: '250ms' }}>
      <Button
        variant="contained"
        onClick={handleSubmit}
        type="submit"
        size='large'
        fullWidth
        endIcon={<Icon  fontSize='small'>done_outline</Icon>}
        id="save-service-button"
        href="#"
      >
        Adicionar
      </Button>
    </Slide>
  )
}
