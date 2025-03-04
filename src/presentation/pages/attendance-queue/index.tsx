import { PageContainer } from '@/presentation/components'
import React from 'react'
import { Icon, List, SpeedDial, SpeedDialAction, SpeedDialIcon, useTheme, Zoom } from '@mui/material'

const actions = [
  { icon: <Icon>file_copy</Icon>, name: 'Copy' },
  { icon: <Icon>save</Icon>, name: 'Save' },
  { icon: <Icon>print</Icon>, name: 'Print' },
  { icon: <Icon>share</Icon>, name: 'Share' },
]

const AttendanceQueuePage: React.FC = () => {
  const theme = useTheme()
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  return (
    <PageContainer title='Fila de Atedimento' subtitle='Acompanhe a fila de atendimento'>
      <List disablePadding>
        {/* {_mockAttendances.map(attendance => (
          <ListItem key={attendance.id} sx={{ gap: 2 }}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: '900' }}>
                {attendance.createdAt.split('T')[1].split('.')[0].substring(0, 5)}
              </Typography>
            </Paper>
            <ListItemText
              primary={attendance.client.name}
              secondary={attendance.services.map(service => service.name).join(', ')}
              slotProps={{
                primary: {
                  sx: {
                    textTransform: 'uppercase',
                  }
                },
                secondary: {
                  sx: {
                    textTransform: 'uppercase',
                    color: 'grey.700',
                }
              }}}
            />
          </ListItem>
        ))} */}
      </List>

      <Zoom in timeout={transitionDuration} unmountOnExit>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          color={theme.palette.secondary.main}
        >
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
          ))}
        </SpeedDial>
      </Zoom>
    </PageContainer>
  )
}

export default AttendanceQueuePage
