import React from 'react'
import {
  AppBar as AppBarMUI,
  Icon,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import { useSetRecoilState } from 'recoil'
import { isOpenDrawer } from '@/presentation/components'

type ElevationScrollProps = {
  window?: () => Window
  children?: React.ReactElement<{ elevation?: number }>
}

export const ElevationScroll: React.FC<ElevationScrollProps> = (props) => {
  const { children, window } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 280,
    target: window ? window() : undefined,
  })

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 1 : 0,
      })
    : null
}

export const AppBar: React.FC = () => {
  const setOpenDrawer = useSetRecoilState(isOpenDrawer)

  return (
    <ElevationScroll>
      <AppBarMUI
        sx={{
          backgroundColor: 'primary.main',
          minHeight: '16vh',
          borderRadius: '0 0 32px 32px',
          alignItems: 'flex-start',
        }}
      >
        <Toolbar sx={{ width: '100%', mt: 1 }}>
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: { xs: 2, sm: 0 } }}
              onClick={() => {
                setOpenDrawer(true)
              }}
            >
              <Icon>store</Icon>
            </IconButton>
          </Slide>

          <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Typography sx={{ flex: 1 }}>Susu Barbearia</Typography>
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
        </Toolbar>
      </AppBarMUI>
    </ElevationScroll>
  )
}
