import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Box, Icon, IconButton, ListItem, ListItemText, Stack, Tooltip, Typography } from '@mui/material'
import { ClientModel } from '@/domain/models'
import { StatusChip } from '@/presentation/components'

type ClientItemProps = {
  client: ClientModel
}

export const ClientItem: React.FC<ClientItemProps> = (props) => {
  return (
    <ListItem
      key={`client-item-${props.client.id}`}
      id={`client-item-${props.client.id}`}
      sx={{
        mt: 1,
        borderRadius: 1,
        backgroundColor: (theme) => `${theme.palette.background.paper}80`,
        boxShadow: 3,
        '& .MuiListItemText-root': { mb: 0 },
      }}
    >
      <ListItemText
        sx={{ flex: 1 }}
        primary={props.client.name}
        slotProps={{
          primary: { textTransform: 'uppercase', id: 'client-name' },
        }}
        secondary={
          <Box mb={0.5}>
            <Typography variant="body2" color="text.secondary" fontSize={11}>
              {props.client.contactNumber}
            </Typography>
            <StatusChip status={props.client.status as any} />
          </Box>
        }
      />
      <Stack direction="row" spacing={1} alignItems="flex-end">
        <Tooltip title="Adicionar na fila" placement="left" arrow>
          <IconButton sx={{ backgroundColor: '#42424240' }} edge="end" aria-label="whastapp">
            <Icon>data_saver_on</Icon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Chamar o WhatsApp" placement="left" arrow>
          <IconButton sx={{ backgroundColor: '#42424240' }} edge="end" aria-label="whastapp">
            <WhatsAppIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Editar informações cliente" placement="left" arrow>
          <IconButton sx={{ backgroundColor: '#42424240' }} edge="end" aria-label="edit">
            <Icon>edit</Icon>
          </IconButton>
        </Tooltip>
      </Stack>
    </ListItem>
  )
}
