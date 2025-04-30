import React from 'react'
import {
  AppBar as AppBarMUI,
  Badge,
  Box,
  Icon,
  IconButton,
  Skeleton,
  Slide,
  Stack,
  Toolbar,
  Typography,
  Zoom,
} from '@mui/material'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isOpenDrawer, QueueInfo } from '@/presentation/components'
import { GenericState } from '../atoms'

export const AppBar: React.FC = () => {
  const setOpenDrawer = useSetRecoilState(isOpenDrawer)
  const company = useRecoilValue(GenericState.companyState)

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
            {company ? (
              <Typography variant="h6" sx={{ flex: 1, textTransform: 'uppercase' }}>
                {company.name}
              </Typography>
            ) : (
              <Box sx={{ flex: 1}}>
                <Skeleton variant="text" width={100} height={30} />
              </Box>
            )}
          </Slide>

          <Stack direction="row" alignItems="center" spacing={0.7}>
            <Zoom in style={{ transitionDelay: '200ms' }} unmountOnExit>
              <IconButton edge="start" aria-label="menu">
                <Icon>tune</Icon>
              </IconButton>
            </Zoom>
            <Zoom in style={{ transitionDelay: '200ms' }} unmountOnExit>
              <IconButton edge="start" aria-label="menu">
                <Icon>visibility</Icon>
              </IconButton>
            </Zoom>
            <Zoom in style={{ transitionDelay: '200ms' }} unmountOnExit>
              <IconButton edge="start" aria-label="menu">
                <Badge color="secondary" badgeContent={4} invisible={false}>
                  <Icon>notifications</Icon>
                </Badge>
              </IconButton>
            </Zoom>
            <Zoom in style={{ transitionDelay: '200ms' }} unmountOnExit>
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
