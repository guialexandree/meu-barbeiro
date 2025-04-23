import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Divider, Icon, IconButton, ListItem, ListItemText, Stack, Tooltip, Typography } from '@mui/material'
import { UserModel } from '@/domain/models'

type UserItemProps = {
  user: UserModel
}

export const UserItem: React.FC<UserItemProps> = (props) => {

  return (
    <ListItem
      key={`user-item-${props.user.id}`}
      id={`user-item-${props.user.id}`}
      sx={{
        mt: 1,
        borderRadius: 2,
        backgroundColor: (theme) => `${theme.palette.primary.light}10`,
        '& .MuiListItemText-root': { mb: 0 },
      }}
    >
      <Stack mt={0.5} alignItems="center">
        <Typography variant="body2" color="text.primary" fontSize={14} fontWeight={900} fontFamily="Inter">
          14:50
        </Typography>
        <Typography variant="caption" color="text.secondary" fontSize={11} fontFamily="Inter" textAlign="center">
              R$ 50
            </Typography>
      </Stack>

      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      <ListItemText
        sx={{ flex: 1, mt: 0.5 }}
        primary={props.user.name}
        slotProps={{
          primary: {
            textTransform: 'uppercase',
            id: 'user-name',
            sx: { lineHeight: 1, fontWeight: 500, fontFamily: 'Inter' },
          },
        }}
        secondary={
          <Stack alignItems="flex-start">
            <Typography variant="body2" color="text.secondary" fontSize={11} fontFamily="Inter">
              CORTE + HIDRATAÇÃO
            </Typography>
          </Stack>
        }
      />
      <Stack direction="row" spacing={1} alignItems="flex-end">
        <Tooltip title="Adicionar na fila" placement="left" arrow>
          <IconButton
            size={'small'}
            sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}10` }}
            edge="end"
            aria-label="adicioanr na fila"
          >
            <Icon fontSize='small'>notifications_active</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Chamar o WhatsApp" placement="left" arrow>
          <IconButton
            size={'small'}
            sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}10` }}
            edge="end"
            aria-label="whastapp"
          >
            <WhatsAppIcon fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title="Adicionar na fila" placement="left" arrow>
          <IconButton
            size={'small'}
            sx={{ backgroundColor: (theme) => `${theme.palette.primary.light}10` }}
            edge="end"
            aria-label="adicioanr na fila"
          >
            <Icon fontSize='small'>more_vert</Icon>
          </IconButton>
        </Tooltip>
      </Stack>
    </ListItem>
  )
}
