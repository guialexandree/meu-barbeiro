import React from 'react'
import { Box, Slide, Stack, Typography, Zoom } from '@mui/material'
import logoImg from '@/presentation/assets/logo.png'

type PageTitleProps = {
  title: string
  subtitle?: string
}

export const PageTitle: React.FC<PageTitleProps> = (props) => {
  return (
    <Stack
      component="header"
      sx={{
        mb: 2,
        height: 65,
        px: 2,
        mr: 2,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Zoom timeout={400} in mountOnEnter unmountOnExit>
          <Box
            src={logoImg}
            component={'img'}
            sx={{ p: 0.5, width: 80, height: 80, backgroundColor: '#111111', borderRadius: 24 }}
          />
        </Zoom>

        <Slide direction="down" in mountOnEnter unmountOnExit>
          <Stack>
            <Typography
              variant="h6"
              id="page-title"
              color="text.secondary"
              sx={{
                letterSpacing: 0.5,
                fontSize: 16,
                lineHeight: 1.2,
                textTransform: 'uppercase',
                fontFamily: 'Inter',
              }}
            >
              {props.title}
            </Typography>
            <Typography
              id="page-subtitle"
              variant="body2"
              sx={{ fontSize: 13, fontFamily: 'Inter', textTransform: 'lowercase' }}
              color="grey.500"
              lineHeight={1.1}
            >
              {props.subtitle}
            </Typography>
          </Stack>
        </Slide>
      </Stack>
    </Stack>
  )
}
