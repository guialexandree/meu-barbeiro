import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Icon, IconButton, ListItem, ListItemText, Stack, Tooltip, Typography } from '@mui/material'
import { UserModel } from '@/domain/models'
import { StatusUser } from '@/presentation/components'
import { useFormat } from '@/presentation/hooks'

type UserItemProps = {
  user: UserModel
}

export const UserItem: React.FC<UserItemProps> = (props) => {
  const { formatPhoneNumber } = useFormat()

  return (
    <ListItem
      key={`user-item-${props.user.id}`}
      id={`user-item-${props.user.id}`}
      sx={{
        mt: 1,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        '& .MuiListItemText-root': { mb: 0 },
      }}
    >
      <ListItemText
        sx={{ flex: 1 }}
        primary={props.user.name}
        slotProps={{
          primary: { textTransform: 'uppercase', id: 'user-name', sx: { lineHeight: 1 } },
        }}
        secondary={
          <Stack mb={0.5}alignItems="flex-start">
            <Typography variant="body2" color="text.secondary" fontSize={11} fontFamily="Inter">
              {formatPhoneNumber(props.user.contactNumber.slice(-11))}
            </Typography>

            <StatusUser status={props.user.status as any} />
          </Stack>
        }
      />
      <Stack direction="row" spacing={1} alignItems="flex-end">
        <Tooltip title="Adicionar na fila" placement="left" arrow>
          <IconButton
            sx={{ backgroundColor: 'background.default' }}
            edge="end"
            aria-label="whastapp"
          >
            <Icon>data_saver_on</Icon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Chamar o WhatsApp" placement="left" arrow>
          <IconButton sx={{ backgroundColor: 'background.default' }} edge="end" aria-label="whastapp">
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </ListItem>
  )
}
