import { PageContainer } from '@/presentation/components'
import React from 'react'
import { List } from '@mui/material'

const AttendanceQueuePage: React.FC = () => {

  return (
    <PageContainer>
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

    </PageContainer>
  )
}

export default AttendanceQueuePage
