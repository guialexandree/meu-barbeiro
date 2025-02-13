import React from 'react'
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid2,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import errorListImg from '@/presentation/assets/error-list.svg'

type PageContainerProps = {
  children: React.ReactNode
  loadPage: () => Promise<void>
}

export const PageContainer: React.FC<PageContainerProps> = (props) => {
  const theme = useTheme()
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const loadPage = () => {
    props
      .loadPage()
      .then(() => {
        setError('')
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }

  React.useEffect(() => {
    loadPage()
  }, [])

  if (loading) {
    return (
      <Backdrop open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
    )
  }

  if (error) {
    return (
      <Stack sx={{ pt: { xs: 4, sm: 6 }, opacity: 0.7 }} alignItems="center" spacing={1}>
        <Box component="img" src={errorListImg} alt="Erro ao carregar serviços" width={180} height={180} />
        <Typography variant="h6" align="center">
          Erro ao carregar alertas
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setError('')
            loadPage()
          }}
        >
          tentar novamente
        </Button>
      </Stack>
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
