import React from 'react'
import { Avatar, Paper, Slide, Stack, Typography } from '@mui/material'
import logoImg from '@/presentation/assets/logo.png'

type PageTitleProps = {
  title: string
  subtitle: string
}

export const PageTitle: React.FC<PageTitleProps> = (props) => {
  return (
    <Slide direction="down" in mountOnEnter unmountOnExit>
      <Paper
        component='header'
        sx={{
          ml: 4,
          mr: 2,
          mb: 2,
          height: 65,
          position: 'relative',
          pl: 7,
          pr: 1,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={logoImg}
            sx={{
              width: 80,
              height: 80,
              position: 'absolute',
              left: -20,
              top: -10,
            }}
          />

          <Stack direction="column">
            <Typography
              variant="h6"
              id='page-title'
              sx={{
                letterSpacing: 0.5,
                mt: 0.5,
                fontSize: 16,
                textTransform: 'uppercase',
              }}
            >
              {props.title}
            </Typography>
            <Typography
              id='page-subtitle'
              variant="body2"
              sx={{ fontSize: 13 }}
              color="grey.500"
              lineHeight={1.1}
            >
              {props.subtitle}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Slide>
  )
}
