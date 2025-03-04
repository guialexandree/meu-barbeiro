import React from 'react'
import { Grid2, Stack, useMediaQuery, useTheme } from '@mui/material'
import { PageLoader } from '../page-loader'
import { PageTitle } from '../page-title'

type PageContainerProps = {
  children: React.ReactNode
  onInit?: () => Promise<void>
  loading?: boolean
  title: string
  subtitle: string
}

export const PageContainer: React.FC<PageContainerProps> = (props) => {
  const theme = useTheme()
  const [loadingInit, setLoadingInit] = React.useState(props?.onInit && true)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  React.useEffect(() => {
    props
      .onInit?.()
      .finally(() => setLoadingInit(false))
  }, [])

  if (loadingInit || props?.loading) {
    return (
      <PageLoader loading />
    )
  }

  return (
    <Grid2
      container
      component="section"
      sx={{
        pt: `calc(${isMobile ? 120 : 136}px + 16px)`,
        pb: 6,
        minHeight: '100%',
        color: 'white',
        flexDirection: 'column',
        position: 'relative',
        maxWidth: 1080,
        margin: '0 auto',
      }}
    >
      <PageTitle title={props.title} subtitle={props.subtitle} />
      <Stack sx={{ flex: 1 }}>{props.children}</Stack>
    </Grid2>
  )
}
