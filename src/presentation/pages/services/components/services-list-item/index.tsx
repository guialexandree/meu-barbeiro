import React from 'react'
import { useSetRecoilState } from 'recoil'
import { ServiceModel } from '@/domain/models'
import { Box, Chip, Icon, IconButton, ListItem, ListItemText, Stack } from '@mui/material'
import { useFormat } from '@/presentation/hooks'
import * as State from '@/presentation/pages/services/components/atoms'

type ServiceListItemProps = {
  service: ServiceModel
}

export const ServiceListItem: React.FC<ServiceListItemProps> = (props) => {
  const { formatCoins } = useFormat()
  const setOpenForm = useSetRecoilState(State.isOpenFormServiceState)
  const setServiceId = useSetRecoilState(State.idNewServiceState)
  const setName = useSetRecoilState(State.nameNewServiceState)
  const setDescription = useSetRecoilState(State.descriptionNewServiceState)
  const setPrice = useSetRecoilState(State.priceNewServiceState)
  const setTimeExecution = useSetRecoilState(State.timeExecutionNewServiceState)
  const setStatus = useSetRecoilState(State.statusNewServiceState)

  const handleEdit = () => {
    setName(props.service.name)
    setDescription(props.service.description)
    setPrice(props.service.price)
    setTimeExecution(props.service.timeExecution)
    setStatus(props.service.status)
    setServiceId(props.service.id)
    setOpenForm(true)
  }

  return (
    <ListItem
      key={`service-${props.service.id}`}
      sx={{
        borderRadius: 0,
        display: 'flex',
        flexWrap: 'wrap',
        borderBottom: 'solid 1px',
        borderColor: 'divider',
        ':last-child': {
          borderBottom: 'none',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        },
        '& .MuiListItemText-root': { mb: 0 }
      }}
    >
      <Stack direction="row" sx={{ flex: 1 }}>
        <ListItemText
          sx={{ flexGrow: 1, textTransform: 'uppercase' }}
          primary={props.service.name}
          secondary={props.service.description}
          slotProps={{
            secondary: { fontSize: 11, color: 'grey.600' },
          }}
        />
        <ListItemText
          sx={{ flexGrow: 0.1 }}
          primary={formatCoins(props.service.price)}
          secondary={`${props.service.timeExecution} min`}
        />
        <Stack justifyContent='flex-end'>
          <IconButton
            size="small"
            sx={{ backgroundColor: '#42424240' }}
            edge="end"
            aria-label="delete"
            onClick={handleEdit}
          >
            <Icon sx={{ color: 'grey.600' }}>edit</Icon>
          </IconButton>
        </Stack>
      </Stack>

      <Stack direction="row" sx={{ width: '100%', justifyContent: 'space-between' }}>
        <Chip
          variant="outlined"
          icon={
            <Icon color={props.service.status === 'ativo' ? 'success' : 'error'} sx={{ fontSize: 10 }}>
              circle
            </Icon>
          }
          label={props.service.status}
          sx={{
            px: 0.5,
            borderRadius: 1,
            color: 'grey.400',
            borderColor: 'grey.800',
            backgroundColor: theme => `${theme.palette[props.service.status === 'ativo' ? 'success' : 'error'].main}13`,
            height: 24,
          }}
        />
      </Stack>
    </ListItem>
  )
}
