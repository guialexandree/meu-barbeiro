import React from 'react'
import { AppBar as AppBarMUI, Badge, Icon, IconButton, Slide, Stack, Toolbar, Typography, Zoom } from '@mui/material'
import { useSetRecoilState } from 'recoil'
import { isOpenDrawer, QueueInfo } from '@/presentation/components'

export const AppBar: React.FC = () => {
  const setOpenDrawer = useSetRecoilState(isOpenDrawer)

  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit>
      <AppBarMUI
        elevation={1}
        sx={{
          maxWidth: '100vw',
          backgroundColor: 'primary.main',
          minHeight: 90,
          borderRadius: 0,
          alignItems: 'flex-start',
          position: 'relative',
        }}
      >
        <Toolbar sx={{ width: '100%', mt: 1 }}>
          <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Typography variant="h6" sx={{ flex: 1, textTransform: 'uppercase' }}>
              Susu Barbearia
            </Typography>
          </Slide>

          <Stack direction="row" alignItems="center" spacing={0.7}>
            <Zoom in timeout={500} style={{ transitionDelay: '200ms' }} unmountOnExit>
              <IconButton edge="start" aria-label="menu">
                <Icon>tune</Icon>
              </IconButton>
            </Zoom>
            <Zoom in timeout={500} style={{ transitionDelay: '200ms' }} unmountOnExit>
              <IconButton edge="start" aria-label="menu">
                <Badge color="secondary" badgeContent={4} invisible={false}>
                  <Icon>notifications</Icon>
                </Badge>
              </IconButton>
            </Zoom>
            <Zoom in timeout={500} style={{ transitionDelay: '200ms' }} unmountOnExit>
              <IconButton
                edge="start"
                size="large"
                aria-label="menu"
                sx={{ backgroundColor: 'primary.light' }}
                onClick={() => {
                  setOpenDrawer(true)
                }}
              >
                <Icon>menu</Icon>
              </IconButton>
            </Zoom>
          </Stack>
        </Toolbar>
        <Toolbar sx={{ width: '100%', left: 0, bottom: -30, position: 'absolute' }}>
          <QueueInfo />
        </Toolbar>
      </AppBarMUI>
    </Slide>
  )
}
