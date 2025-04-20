import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { Stack } from '@mui/material'
import { Factories } from '@/main/factories/usecases'
import { NotfoundError } from '@/domain/errors'
import { PageContainer } from '@/presentation/components'
import { State } from '@/presentation/pages/user-view/components/atoms'
import { AttendancesList, UserActions, UserHeader, UserInfo } from '@/presentation/pages/user-view/components'
import { useNotify } from '@/presentation/hooks'

const UsersViewPage: React.FC = () => {
  const notify = useNotify()
  const navigate = useNavigate()
  const setLoading = useSetRecoilState(State.loadingState)
  const setUserResult = useSetRecoilState(State.userResultState)
  const setError = useSetRecoilState(State.errorUserState)

  const { id } = useParams()
  const loadUserById = React.useMemo(() => Factories.makeRemoteLoadUserById(), [])

  const onLoadUser = React.useCallback((id: string) => {
    setLoading(true)
    setError('')

    loadUserById
      .load({ id })
      .then((userResult) => {
        if (userResult.data) {
          setUserResult(userResult)
        }
      })
      .catch((error) => {
        if (error instanceof NotfoundError) {
          notify.notify(error.message, { type: 'error' })
          navigate('/clientes')
          return
        }
        setError((error as Error).message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  React.useEffect(() => {
    if (id) {
      onLoadUser(id)
    } else {
      setUserResult(null as any)
    }
  }, [id])

  return (
    <PageContainer>
      <Stack alignItems="flex-start" justifyContent="center" px={2}>
        <UserHeader />

        <UserInfo />

        <UserActions />

        <AttendancesList />
      </Stack>
    </PageContainer>
  )
}

export default UsersViewPage
