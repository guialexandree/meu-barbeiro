import React from 'react'
import { ServiceModel } from '@/domain/models'
import { Icon, IconButton, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import { useFormat } from '@/presentation/hooks'
import { useNavigate } from 'react-router-dom'

type ServiceQueueItemProps = {
  service: ServiceModel
}

export const ServiceQueueItem: React.FC<ServiceQueueItemProps> = (props) => {
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
        borderRadius: 2,
        backgroundColor: (theme) => `${theme.palette.primary.light}10`,
        '& .MuiListItemText-root': { mb: 0 },
      }}
    >
      <Stack flexGrow={1}>
        <ListItemText
          sx={{ flexGrow: 1, textTransform: 'uppercase' }}
          primary={props.service.name}
          secondary={
            props.service.description && (
              <Typography variant="body2" color="text.secondary" fontSize={11} fontFamily="Inter">
                {props.service.description}
              </Typography>
            )
          }
          slotProps={{
            primary: { id: 'service-name', sx: { lineHeight: 1 } },
            secondary: { fontSize: 11, color: 'grey.600', id: 'service-description' },
          }}
        />
      </Stack>

      <ListItemText
        sx={{ flexGrow: 0, pr: 2 }}
        primary={formatCoins(props.service.price)}
        secondary={`${props.service.timeExecution} min`}
        slotProps={{
          primary: { sx: { lineHeight: 1 } },
        }}
      />

      <IconButton
        size={'small'}
        sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}10` }}
        edge="end"
        aria-label="delete"
        onClick={handleEdit}
      >
        <Icon fontSize='small' sx={{ color: 'grey.600' }}>delete_outlined</Icon>
      </IconButton>
    </ListItem>
  )
}
