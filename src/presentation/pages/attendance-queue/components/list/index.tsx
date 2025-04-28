import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { List } from '@/presentation/components'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'
import { GenericState } from '@/presentation/components/atoms'
import { Fade, Stack, Typography } from '@mui/material'
import { AttendanceItem } from '../attendance-item'
import { Factories } from '@/main/factories/usecases'

export const AttendanceQueueList: React.FC = () => {
  const [attendancesResult, setAttendanceResult] = useRecoilState(State.List.attendancesResultState)
  const setPageState = useSetRecoilState(State.listState)
  const company = useRecoilValue(GenericState.companyState)

  const loadAttendances = React.useMemo(() => Factories.makeRemoteLoadAttendances(), [])

  const onLoad = React.useCallback(async () => {
    try {
      setPageState({ loading: true, noResults: false, error: '' })
      const result = await loadAttendances.load()
      setAttendanceResult(result)
      setPageState({ loading: false, noResults: false, error: '' })
    } catch (error: any) {
      console.error(error)
      setPageState({ loading: false, noResults: false, error: error.message })
    }
  }, [])

  React.useEffect(() => {
    onLoad()
  }, [])

  if (company?.statusAttendance !== 'serving') {
    return null
  }

  return (
    <Stack>
      <Typography mx={2} mt={2} variant="h6" fontWeight={900} fontFamily="Inter" letterSpacing={1}>
        PRÓXIMOS NA FILA
      </Typography>

      <List
        id="attendance-queue-list"
        onReload={onLoad}
        listState={State.listState}
        messagesStates={{
          noResults: `Nenhum cliente na fila`,
          error: 'Erro ao carregar fila de atendimento',
        }}
      >
        {attendancesResult?.data?.slice(1, 4)?.map((attendance, index) => (
          <Fade in timeout={700} style={{ transitionDelay: `${index * 100}ms` }} key={attendance.id}>
            <span>
              <AttendanceItem attendance={attendance} />
            </span>
          </Fade>
        ))}
      </List>
    </Stack>
  )
}
