import React from 'react'
import {
  AppBar as AppBarMUI,
  Icon,
  IconButton,
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
      <AppBarMUI sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: { xs: 2, sm: 0 } }}
            onClick={() => { setOpenDrawer(true) }}
          >
            <Icon>menu</Icon>
          </IconButton>

          <Typography>Barber Admin</Typography>
        </Toolbar>
      </AppBarMUI>
    </ElevationScroll>
  )
}
