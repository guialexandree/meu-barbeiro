import React from 'react'
import { Stack } from '@mui/material'
import { ValueIndicator } from '@/presentation/components'
import { useRecoilValue } from 'recoil'
import { State } from '@/presentation/pages/client-list/components/atoms'

export const Totalizers: React.FC = () => {
  const clientResult = useRecoilValue(State.List.clientsResultState)

  return (
    <Stack direction="row" spacing={1} mx={2} mb={1}>
      <ValueIndicator title="Total de clientes" value={clientResult?.meta?.total} entryDirection="right" icon="peoples" />

      <ValueIndicator
        title="Novos clientes"
        value="23"
        subvalue="10%"
        descriptionSubvalue="10% de crescimento em relação ao mês anterior"
        entryDirection="left"
        icon="grade"
      />
    </Stack>
  )
}
