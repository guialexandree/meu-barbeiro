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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { GenericState } from '@/presentation/components/atoms'
import { isOpenDrawer } from '../drawer/atoms'
import { QueueInfo } from '../queue-info'

export const AppBar: React.FC = () => {
  const setOpenDrawer = useSetRecoilState(isOpenDrawer)
  const [showAmount, setShowAmount] = useRecoilState(GenericState.showAmountState)
  const company = useRecoilValue(GenericState.companyState)

  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit>
      <AppBarMUI
        position="sticky"
        variant="outlined"
        sx={{
          maxWidth: '100vw',
          border: 'none',
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
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="rounded" width={140} height={30} />
              </Box>
            )}
          </Slide>

          <Stack direction="row" alignItems="center" spacing={0.7}>
            <Zoom in style={{ transitionDelay: '200ms' }} unmountOnExit>
              <IconButton edge="start" aria-label="menu" onClick={() => setShowAmount(currentState => !currentState)}>
                <Icon>{showAmount ? 'visibility_off' : 'visibility'}</Icon>
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
