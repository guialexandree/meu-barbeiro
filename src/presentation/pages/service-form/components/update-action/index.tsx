import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ServiceModel } from '@/domain/models'
import { Button, Icon, Slide } from '@mui/material'
import { useNotify } from '@/presentation/hooks'
import { State } from '@/presentation/pages/service-form/components/atoms'
import { State as ServiceState } from '@/presentation/pages/service-list/components/atoms'
import { serviceUpdateValidation } from './validations'
import { Factories } from '@/main/factories/usecases'
import { DialogConfirm } from '@/presentation/components'

export const UpdateFormAction: React.FC = () => {
  const { notify } = useNotify()
  const navigate = useNavigate()
  const serviceCreate = useRecoilValue(State.serviceFormState)
  const setServices = useSetRecoilState(ServiceState.List.servicesState)
  const setLoading = useSetRecoilState(State.loadingFormState)
  const setName = useSetRecoilState(State.nameState)
  const setOpenUpdateConfirm = useSetRecoilState(State.openUpdateConfirmState)
  const { id } = useParams<{ id: string }>()

  const updateService = React.useMemo(() => Factories.makeRemoteUpdateService(), [])

  const onSuccess = (service: ServiceModel): void => {
    setServices((services) => [service, ...services])
    notify('Serviço atualizado com sucesso', { type: 'success' })
    navigate('/servicos')
  }

  const onError = (error: string, inputName: string): void => {
    if (inputName === 'name') {
      setName((currentState) => ({ ...currentState, error }))
      return
    }

    notify(error, { type: 'error' })
  }

  const validateForm = (): boolean => {
    const result = serviceUpdateValidation.safeParse({ ...serviceCreate, id })

    if (!result.success) {
      const error = result.error.errors.at(0)!
      const inputName = error.path.at(0) as string
      onError(error.message, inputName)
    }

    return result.success
  }

  const handleSubmit = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault()
    if (!validateForm()) return

    setOpenUpdateConfirm(true)
  }

  const handleServiceUpdate = async () => {
    if (!id) return

    setLoading(true)
    updateService
      .update({ ...serviceCreate, id })
      .then((result) => {
        if (result.success) {
          return onSuccess({ ...serviceCreate, id })
        }

        onError(result.error, 'name')
      })
      .catch(() => {
        notify('Erro ao editar serviço', { type: 'error' })
      })
      .finally(() => setLoading(false))
  }

  if (!id) {
    return undefined
  }

  return (
    <>
      <Slide in direction="left" unmountOnExit mountOnEnter style={{ transitionDelay: '250ms' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          type="submit"
          size='large'
          fullWidth
          endIcon={<Icon>done_outline</Icon>}
          id="update-service-button"
          href="#"
        >
          Editar
        </Button>
      </Slide>

      <DialogConfirm
        icon="info"
        title="Atualização de serviço"
        answer={`O serviço ${serviceCreate.name.toUpperCase()} será atualizado, deseja continuar com a eliminação?`}
        onConfirm={handleServiceUpdate}
        openState={State.openUpdateConfirmState}
      />
    </>
  )
}
