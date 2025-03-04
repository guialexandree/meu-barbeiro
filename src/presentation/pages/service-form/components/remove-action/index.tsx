import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Button } from '@mui/material'
import { RemoveServiceParams } from '@/domain/usecases'
import { useNotify } from '@/presentation/hooks'
import { State } from '@/presentation/pages/service-form/components/atoms'
import { State as ServicesState } from '@/presentation/pages/services/components/atoms'
import { Factories } from '@/main/factories/usecases'
import { useNavigate } from 'react-router-dom'

export const ServiceFormRemoveAction: React.FC = () => {
  const navigate = useNavigate()
  const { notify } = useNotify()
  const serviceId = useRecoilValue(State.idServiceCreateState)
  const setServices = useSetRecoilState(ServicesState.List.servicesState)
  const setLoading = useSetRecoilState(State.loadingState)

  const removeService = React.useMemo(() => Factories.makeRemoteRemoveService(), [])

  const onSuccess = (serviceId: string): void => {
    setServices((services) => services.filter((currentService) => currentService.id !== serviceId))
    notify('Serviço removido com sucesso', { type: 'success' })
    navigate('/servicos')
  }

  const handleRemoveService = (): void => {
    setLoading(true)

    const params: RemoveServiceParams = {
      id: serviceId,
    }

    removeService
      .remove(params)
      .then(removeResult => {
        if (removeResult.success) {
          return onSuccess(removeResult.data.id)
        }

        notify('Erro ao tentar remover serviço, tente novamente mais tarde', { type: 'error' })
      })
      .catch((error) => {
        notify('Erro ao atualizar serviço', { type: 'error' })
        console.error(error)
      })
      .finally(() => setLoading(false))
  }

  if (!serviceId.length) {
    return undefined
  }

  return (
    <Button color="error" sx={{ color: 'error.light' }} onClick={handleRemoveService} size="small">
      Remover
    </Button>
  )
}
