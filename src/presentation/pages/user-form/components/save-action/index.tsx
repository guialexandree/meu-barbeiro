import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useNavigate, useParams } from 'react-router-dom'
import { Factories } from '@/main/factories/usecases'
import { UserModel } from '@/domain/models'
import { Button, Icon, Slide } from '@mui/material'
import { useNotify } from '@/presentation/hooks'
import { State } from '@/presentation/pages/user-form/components/atoms'
import { State as ClientsState } from '@/presentation/pages/user-list/components/atoms'
import { clientCreateValidation } from './validations'

export const SaveAction: React.FC = () => {
  const { notify } = useNotify()
  const navigate = useNavigate()
  const newUser = useRecoilValue(State.newUserFormState)
  const loading = useRecoilValue(State.loadingFormState)
  const setClientsResult = useSetRecoilState(ClientsState.List.usersResultState)
  const setLoading = useSetRecoilState(State.loadingFormState)
  const setError = useSetRecoilState(State.errorFormState)
  const setFormSuccess = useSetRecoilState(State.successFormState)
  const setName = useSetRecoilState(State.nameState)
  const setPassword = useSetRecoilState(State.passwordState)
  const setContactNumber = useSetRecoilState(State.contactNumberState)
  const { id } = useParams<{ id: string }>()

  const createClient = React.useMemo(() => Factories.makeRemoteCreateUser(), [])

  const onSuccess = (client: UserModel): void => {
    setClientsResult((currentState) => ({ ...currentState, data: [...currentState.data, client] }))
    navigate('/clientes')
    setFormSuccess(true)
    notify('Cadastro criado com sucesso', { type: 'success' })
  }

  const onError = (error: string, inputName: string): void => {
    const setter = {
      name: setName,
      contactNumber: setContactNumber,
      password: setPassword,
    }[inputName]

    setter?.((currentState) => ({ ...currentState, error }))
  }

  const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    handleServiceCreate()
  }

  const validateForm = (): boolean => {
    const result = clientCreateValidation.safeParse(newUser)

    if (!result.success) {
      const error = result.error.errors.at(0)!
      const inputName = error.path.at(0) as string
      onError(error.message, inputName)
    }

    return result.success
  }

  const handleServiceCreate = (): void => {
    if (!validateForm()) return

    setLoading(true)
    createClient
      .create(newUser)
      .then((result) => {
        if (result.success) {
          onSuccess({ ...newUser, id: result.data.id } as any)
          return
        }

        setError(result.error)
      })
      .catch(() => {
        notify('Erro ao criar serviço', { type: 'error' })
      })
      .finally(() => setLoading(false))
  }

  if (id) {
    return undefined
  }

  return (
    <Slide in={true} direction="left" unmountOnExit mountOnEnter>
      <Button
        variant="contained"
        onClick={handleSubmit}
        loading={loading}
        type="submit"
        fullWidth
        endIcon={<Icon fontSize='small'>check</Icon>}
        id="save-service-button"
        href="#"
      >
        Gravar
      </Button>
    </Slide>
  )
}
