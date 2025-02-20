import React from 'react'
import { Backdrop, CircularProgress, Grid2, Stack, useMediaQuery, useTheme } from '@mui/material'

type PageContainerProps = {
  children: React.ReactNode
  loadPage: () => Promise<void>
}

export const PageContainer: React.FC<PageContainerProps> = (props) => {
  const theme = useTheme()
  const [loading, setLoading] = React.useState(true)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  React.useEffect(() => {
    props
      .loadPage()
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Backdrop open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
    )
  }

  return (
    <Grid2
      container
      component="section"
      sx={{
        pt: `calc(${isMobile ? 120 : 136}px + 16px)`,
        pb: 6,
        minHeight: '80vh',
        color: 'white',
        flexDirection: 'column',
        position: 'relative',
        maxWidth: 1080,
        margin: '0 auto',
      }}
    >
      <Stack sx={{ flex: 1 }}>{props.children}</Stack>
    </Grid2>
  )
}
