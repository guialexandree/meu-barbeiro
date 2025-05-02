import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
import { Button, Icon, Slide } from '@mui/material'
import { Factories } from '@/main/factories/usecases'
import { UserModel } from '@/domain/models'
import { CreateUserParams } from '@/domain/usecases'
import { useNotify } from '@/presentation/hooks'
import { State } from '@/presentation/pages/user-form/components/atoms'
import { State as ClientsState } from '@/presentation/pages/user-list/components/atoms'
import { clientCreateValidation } from './validations'

export const SaveAction: React.FC = () => {
  const { notify } = useNotify()
  const loading = useRecoilValue(State.loadingFormState)
  const setClientsResult = useSetRecoilState(ClientsState.List.usersResultState)
  const setLoading = useSetRecoilState(State.loadingFormState)
  const setError = useSetRecoilState(State.errorFormState)
  const setFormSuccess = useSetRecoilState(State.successFormState)
  const setName = useSetRecoilState(State.nameState)
  const setNickname = useSetRecoilState(State.nicknameState)
  const setPassword = useSetRecoilState(State.passwordState)
  const setContactNumber = useSetRecoilState(State.contactNumberState)
  const { id } = useParams<{ id: string }>()

  const createClient = React.useMemo(() => Factories.makeRemoteCreateUser(), [])

  const onSuccess = (client: UserModel): void => {
    setClientsResult((currentState) => ({ ...currentState, data: [client, ...(currentState?.data || [])] }))
    setFormSuccess(true)
  }

  const onError = (error: string, inputName: string): void => {
    const setter = {
      name: setName,
      nickname: setNickname,
      contactNumber: setContactNumber,
      password: setPassword,
    }[inputName]

    setter?.((currentState) => ({ ...currentState, error }))
  }

  const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    const formData = new FormData((event.target as HTMLFormElement).closest('form') as HTMLFormElement)
    const params: CreateUserParams = Object.fromEntries(formData.entries()) as CreateUserParams

    if (!validateForm(params)) {
      return
    }

    handleUserCreate(params)
  }

  const validateForm = (params: CreateUserParams): boolean => {
    const result = clientCreateValidation.safeParse(params)

    if (!result.success) {
      const error = result.error.errors.at(0)!
      const inputName = error.path.at(0) as string
      onError(error.message, inputName)
    }

    return result.success
  }

  const handleUserCreate = (params: CreateUserParams): void => {
    setLoading(true)
    createClient
      .create(params)
      .then((result) => {
        if (result.success) {
          onSuccess(result.data)
          return
        }

        setError(result.error)
      })
      .catch(() => {
        notify('Erro ao tentar criar cliente', { type: 'error' })
      })
      .finally(() => setLoading(false))
  }

  if (id) {
    return undefined
  }

  return (
    <Slide in direction="left" unmountOnExit mountOnEnter style={{ transitionDelay: '250ms' }}>
      <Button
        variant="contained"
        onClick={handleSubmit}
        loading={loading}
        type="submit"
        size='large'
        fullWidth
        endIcon={<Icon fontSize="small">done_outline</Icon>}
        id="save-user-button"
        href="#"
      >
        Adicionar
      </Button>
    </Slide>
  )
}
