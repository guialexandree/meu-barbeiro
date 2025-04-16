import React from 'react'
import { AppBar as AppBarMUI, Badge, Icon, IconButton, Slide, Stack, Toolbar, Typography } from '@mui/material'
import { useSetRecoilState } from 'recoil'
import { isOpenDrawer, QueueInfo } from '@/presentation/components'

export const AppBar: React.FC = () => {
  const setOpenDrawer = useSetRecoilState(isOpenDrawer)

  return (
    <AppBarMUI
      elevation={1}
      sx={{
        maxWidth: '100vw',
        backgroundColor: 'primary.main',
        minHeight: 120,
        borderRadius: '0 0 22px 22px',
        alignItems: 'flex-start',
      }}
    >
      <Toolbar sx={{ width: '100%', mt: 1 }}>
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <Typography variant="h6" sx={{ flex: 1, textTransform: 'uppercase' }}>
            Susu Barbearia
          </Typography>
        </Slide>

        <Stack direction="row" spacing={1} alignItems="center">
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <IconButton size="large" edge="start" aria-label="menu">
              <Badge color="secondary" badgeContent={4} invisible={false}>
                <Icon>notifications</Icon>
              </Badge>
            </IconButton>
          </Slide>
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ backgroundColor: 'primary.light' }}
              onClick={() => {
                setOpenDrawer(true)
              }}
            >
              <Icon>menu</Icon>
            </IconButton>
          </Slide>
        </Stack>
      </Toolbar>

      <Toolbar sx={{ width: '100%' }}>
        <QueueInfo />
      </Toolbar>
    </AppBarMUI>
  )
}
