import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Stack } from '@mui/material'
import { PageContainer } from '@/presentation/components'
import { Factories } from '@/main/factories/usecases'
import { State } from '@/presentation/pages/attendance-form/components/atoms'
import { Actions, Client, Position, Services } from './components'

const UserFormPage: React.FC = () => {
  const setSelectedServices = useSetRecoilState(State.selectedServicesState)
  const setLoadingUsers = useSetRecoilState(State.loadingUsersState)
  const setLoadingService = useSetRecoilState(State.loadingServicesState)
  const setUsers = useSetRecoilState(State.usersState)

  const loadDefaultService = React.useMemo(() => Factories.makeRemoteLoadDefaultService(), [])
  const loadAvailablesUsers = React.useMemo(() => Factories.makeRemoteLoadAvailablesUsers(), [])

  const onLoad = React.useCallback(async () => {
    try {
      setLoadingUsers(true)
      setLoadingService(true)

      const usersPromise = loadAvailablesUsers.load()
      const defaultServicePromise = loadDefaultService.load()

      const [usersResult, serviceResult] = await Promise.all([usersPromise, defaultServicePromise])

      if (usersResult.success) {
        setUsers(usersResult.data)
      }

      if (serviceResult.success) {
        setSelectedServices([serviceResult.data])
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      setLoadingUsers(false)
      setLoadingService(false)
    }
  }, [])

  React.useEffect(() => {
    onLoad()
  }, [])

  return (
    <PageContainer>
      <Stack
        component="form"
        sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', pt: 2 }}
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <Stack spacing={3} mx={2} height={'100%'}>
          <Client />
          <Services />
          <Position />
        </Stack>

        <Actions />
      </Stack>
    </PageContainer>
  )
}

export default UserFormPage
