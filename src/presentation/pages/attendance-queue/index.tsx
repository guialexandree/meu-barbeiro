import React from 'react'
import { useSetRecoilState } from 'recoil'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Chip, Icon, Stack } from '@mui/material'
import { Factories } from '@/main/factories/usecases'
import { PageContainer } from '@/presentation/components'
import {
  AttendanceQueueList,
  CurrentAttendance,
  HistoryToday,
  OpenFormAction,
  StatusSwitch,
  SummaryToday,
} from './components'
import { State } from '@/presentation/pages/attendance-queue/components/atoms'

const AttendanceQueuePage: React.FC = () => {
  const setPageState = useSetRecoilState(State.listState)
  const setAttendancesResult = useSetRecoilState(State.List.attendancesResultState)

  const loadAttendances = React.useMemo(() => Factories.makeRemoteLoadAttendances(), [])

  const onLoad = React.useCallback(async () => {
    try {
      setPageState({ loading: true, noResults: false, error: '' })
      const result = await loadAttendances.load()
      setAttendancesResult(result)
      setPageState({ loading: false, noResults: false, error: '' })
    } catch (error: any) {
      console.error(error)
      setPageState({ loading: false, noResults: false, error: error.message })
    }
  }, [])

  React.useEffect(() => {
    onLoad()
  }, [])

  return (
    <PageContainer>
      <InfiniteScroll
        dataLength={1}
        next={() => {}}
        hasMore={false}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        refreshFunction={onLoad}
        loader={
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%', p: 2 }}>
            <Chip
              sx={{ backgroundColor: 'background.paper', color: 'text.secondary' }}
              variant="filled"
              label="Atualizando"
              size="small"
            />
          </Stack>
        }
        pullDownToRefreshContent={
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%', p: 2 }}>
            <Chip
              color="default"
              icon={
                <Icon fontSize="small" sx={{ mr: 1 }}>
                  south
                </Icon>
              }
              sx={{ backgroundColor: 'background.paper', color: 'text.secondary' }}
              variant="filled"
              label="Arraste para baixo para atualizar"
              size="small"
            />
          </Stack>
        }
        releaseToRefreshContent={
          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%', p: 2 }}>
            <Chip
              color="default"
              icon={<Icon sx={{ mr: 1 }}>south</Icon>}
              sx={{ backgroundColor: 'background.paper', color: 'text.secondary' }}
              variant="filled"
              label="Arraste para baixo para atualizar"
              size="small"
            />
          </Stack>
        }
        style={{ minHeight: '100vh' }}
      >
        <>
          <Stack sx={{ px: 2 }} spacing={2} pt={2}>
            <StatusSwitch />

            <CurrentAttendance />
            <SummaryToday />
            <HistoryToday />

            <OpenFormAction />
          </Stack>
          <AttendanceQueueList onReload={onLoad} />
        </>
      </InfiniteScroll>
    </PageContainer>
  )
}

export default AttendanceQueuePage
