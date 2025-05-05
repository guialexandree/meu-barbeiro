import React from 'react'
import { Box, Fade, Slide } from '@mui/material'
import logoImg from '@/presentation/assets/logo.png'
import bgImg from '@/presentation/assets/bg-splash.png'

type SplashPageProps = {
  onFinish: VoidFunction
}

const SplashPage: React.FC<SplashPageProps> = (props) => {
  const [close, setClose] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setClose(true)
      // setTimeout(props.onFinish, 1000)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Fade in={!close} timeout={1000} onExited={props.onFinish}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'background.default',
          position: 'relative',
        }}
      >
        <Fade in>
          <section>
            <Box
              component="img"
              src={bgImg}
              alt="imagem e fundo da splash"
              id="bg-splash"
              sx={{
                objectFit: 'contain',
                position: 'absolute',
                inset: 0,
                opacity: 0.05,
                width: '100%',
              }}
            />
          </section>
        </Fade>

        <Slide direction={close ? 'left' : 'down'} in={!close} unmountOnExit timeout={close ? 200 : 700}>
          <Box
            component="img"
            src={logoImg}
            alt="Logo da barbearia"
            id="logo"
            height={220}
            width={220}
            sx={{
              objectFit: 'contain',
              zIndex: 1,
            }}
          />
        </Slide>
      </Box>
    </Fade>
  )
}

export default SplashPage
