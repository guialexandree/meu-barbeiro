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
import { useRecoilState, useSetRecoilState } from 'recoil'
import { GenericState } from '@/presentation/components/atoms'
import { isOpenDrawer } from '../drawer/atoms'
import { QueueInfo } from '../queue-info'
import { useNotify } from '@/presentation/hooks'
import { Factories } from '@/main/factories/usecases'

export const AppBar: React.FC = () => {
  const { notify } = useNotify()
  const setOpenDrawer = useSetRecoilState(isOpenDrawer)
  const [company, setCompany] = useRecoilState(GenericState.companyState)
  const [loading, setLoading] = useRecoilState(GenericState.loadingCompanyState)
  const [showAmount, setShowAmount] = useRecoilState(GenericState.showAmountState)

  const loadCompany = React.useMemo(() => Factories.makeRemoteLoadCompany(), [])

  const onLoadCompany = React.useCallback(async () => {
    try {
      if (loading) return
      setLoading(true)
      const companyResult = await loadCompany.load()
      if (!companyResult.success) {
        notify(companyResult.error, { type: 'error' })
        return
      }

      setCompany(companyResult.data)
    } catch (error: any) {
      notify(error.message, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    onLoadCompany()
  }, [])

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
              <IconButton edge="start" aria-label="menu" onClick={() => setShowAmount((currentState) => !currentState)}>
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
