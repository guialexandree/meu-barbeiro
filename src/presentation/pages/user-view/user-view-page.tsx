import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Stack } from '@mui/material'
import { Factories } from '@/main/factories/usecases'
import { NotfoundError } from '@/domain/errors'
import { PageContainer } from '@/presentation/components'
import { State } from '@/presentation/pages/user-view/components/atoms'
import { AttendancesList, UserActions, UserHeader, UserInfo } from '@/presentation/pages/user-view/components'
import { useNotify } from '@/presentation/hooks'

const UsersViewPage: React.FC = () => {
  const { notify } = useNotify()
  const navigate = useNavigate()
  const setLoading = useSetRecoilState(State.loadingState)
  const setUserResult = useSetRecoilState(State.userState)
  const setError = useSetRecoilState(State.errorUserState)
  const setAttendancesUser = useSetRecoilState(State.List.attendancesUserState)

  const { id } = useParams()
  const loadUserById = React.useMemo(() => Factories.makeRemoteLoadUserById(), [])
  const loadAttendancesByUser = React.useMemo(() => Factories.makeRemoteLoadAttendancesByUser(), [])

  const onLoad = React.useCallback(async (id: string) => {
    setLoading(true)
    setError('')

    try {
      const userPromise = loadUserById.load({ id })
      const attendancesPromise = loadAttendancesByUser.load({ userId: id })

      const [userResult, attendancesResult] = await Promise.all([userPromise, attendancesPromise])

      if (!userResult.success || !attendancesResult.success) {
        notify(userResult.error, { type: 'error' })
        return
      }

      setUserResult(userResult.data)
      setAttendancesUser(attendancesResult.data)
    } catch (error) {
      if (error instanceof NotfoundError) {
        notify(error.message, { type: 'error' })
        navigate('/clientes')
        return
      }
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (id) {
      onLoad(id)
    } else {
      setUserResult(null as any)
    }
  }, [id])

  if (!id) {
    <Navigate to="/clientes" />
  }

  return (
    <PageContainer>
      <Stack alignItems="flex-start" justifyContent="center" px={2} pt={2}>
        <UserHeader />

        <UserInfo />

        <UserActions />

        <AttendancesList userId={id!} onReload={onLoad} />
      </Stack>
    </PageContainer>
  )
}

export default UsersViewPage
