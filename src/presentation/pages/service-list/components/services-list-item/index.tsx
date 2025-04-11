import React from 'react'
import { ServiceModel } from '@/domain/models'
import { Icon, IconButton, ListItem, ListItemText, Stack } from '@mui/material'
import { useFormat } from '@/presentation/hooks'
import { useNavigate } from 'react-router-dom'
import { StatusChip } from '@/presentation/components'

type ServiceListItemProps = {
  service: ServiceModel
}

export const ServiceListItem: React.FC<ServiceListItemProps> = (props) => {
  const navigate = useNavigate()
  const { formatCoins } = useFormat()

  const handleEdit = () => {
    navigate(`/servico/${props.service.id}`)
  }

  return (
    <ListItem
      key={`service-${props.service.id}`}
      id={`service-${props.service.id}`}
      sx={{
        mt: 1,
        borderRadius: 1,
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor:  theme => `${theme.palette.background.paper}80`,
        boxShadow: 1,
        '& .MuiListItemText-root': { mb: 0 }
      }}
    >
      <Stack direction="row" sx={{ flex: 1 }}>
        <ListItemText
          sx={{ flexGrow: 1, textTransform: 'uppercase' }}
          primary={props.service.name}
          secondary={props.service.description}
          slotProps={{
            primary: { id: 'service-name' },
            secondary: { fontSize: 11, color: 'grey.600', id: 'service-description' },
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
        <StatusChip status={props.service.status as any}/>
      </Stack>
    </ListItem>
  )
}
