import React from 'react'
import {
  Button,
  Chip,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

const movements = [
  {
    id: 1,
    name: 'CORTE',
    date: '30 min atrás',
    type: 'entrada',
    value: 'R$ 50,00',
  },
  {
    id: 2,
    name: 'CORTE + PROGRESSIVA',
    date: '55 min atrás',
    type: 'entrada',
    value: 'R$ 90,00',
  },
  {
    id: 3,
    name: 'ALMOÇO',
    date: '12:30',
    type: 'saída',
    value: 'R$ 45,00',
  },
  {
    id: 3,
    name: 'CORTE + BARBA',
    date: '11:10',
    type: 'entrada',
    value: 'R$ 55,00',
  },
]

export const MovementsList: React.FC = () => {

  return (
    <Stack sx={{ height: 'max-content' }}>
      <Typography variant="h6" sx={{ px: 2, mt: 2 }}>
        Hoje
      </Typography>
      <List>
        {movements.map((movement) => (
          <Stack key={movement.id}>
            <ListItem sx={{ m: 0, p: 0 }}>
              <ListItemIcon sx={{ height: 40 }}>
                <IconButton disabled sx={{ backgroundColor: 'background.paper' }}>
                  <Icon>person</Icon>
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={movement.name} secondary={movement.date} slotProps={{
                primary: { sx: { fontSize: 13 } },
                secondary: { sx: { fontSize: 11 } },
              }}/>
              <ListItemText
                primary={
                  <Chip
                    sx={{ minWidth: 60 }}
                    label={movement.type}
                    variant="outlined"
                    color={movement.type === 'entrada' ? 'success' : 'error'}
                    size="small"
                  />
                }
                secondary={movement.value}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  pr: 1,
                }}
              />

              <ListItemIcon sx={{ height: 40 }}>
                <IconButton disabled sx={{ backgroundColor: 'background.paper' }}>
                  <Icon>navigate_next</Icon>
                </IconButton>
              </ListItemIcon>
            </ListItem>

            <Divider />
          </Stack>
        ))}
      </List>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mt={1} mr={2}>
        <Button sx={{ backgroundColor: 'grey.900' }} endIcon={<Icon>expand_more</Icon>}>
          ver mais
        </Button>
      </Stack>
    </Stack>
  )
}
