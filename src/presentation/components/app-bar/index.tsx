import React from 'react'
import {
  AppBar as AppBarMUI,
  Avatar,
  Chip,
  Icon,
  IconButton,
  lighten,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
  useTheme,
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
  const theme = useTheme()
  const labelColor = lighten(theme.palette.primary.main, 0.5)
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
        <Toolbar sx={{ width: '100%'}}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexGrow={1} pr={2}>
            <Chip
              color='default'
              sx={{ borderRadius: 16, backgroundColor: 'primary.dark', color: labelColor }}
              avatar={<Avatar sx={{ backgroundColor: 'primary.main' }} alt="5" src="5" />}
              label="NA FILA"
            />
            <Stack direction="row" alignItems="center" spacing={1}>
              <Stack direction="column" alignItems="flex-end" sx={{ borderRight: '1px solid', pr: 2 }}>
                <Typography variant='subtitle2' sx={{ lineHeight: 1, fontWeight: '300' }}>Atendimentos</Typography>
                <Stack direction="row" alignItems="center">
                  <IconButton size='small'>
                    <Icon sx={{ fontSize: 18 }}>content_cut</Icon>
                  </IconButton>
                  <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>12</Typography>
                </Stack>
              </Stack>

              <Stack direction="column" alignItems="flex-end" pl={1}>
                <Typography variant='subtitle2' sx={{ lineHeight: 1, fontWeight: '300', textAlign: 'right' }}>Saldo do dia</Typography>
                <Stack direction="row" justifyContent="flex-end">
                  <Typography variant="subtitle1" sx={{ fontWeight: '600', textAlign: 'right' }}>R$ ****</Typography>
                  <IconButton size='small'>
                    <Icon sx={{ fontSize: 18 }}>visibility</Icon>
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBarMUI>
    </ElevationScroll>
  )
}
