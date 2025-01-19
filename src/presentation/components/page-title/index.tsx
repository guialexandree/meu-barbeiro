import React from 'react'
import { Avatar, Paper, Slide, Stack, Typography } from '@mui/material'

type PageTitleProps = {
  title: string
  subtitle: string
  icon: string
}

export const PageTitle: React.FC<PageTitleProps> = (props) => {
  return (
    <Slide direction="down" in mountOnEnter unmountOnExit>
      <Paper
        sx={{
          ml: 4,
          mr: 2,
          mb: 2,
          height: 65,
          position: 'relative',
          pl: 8,
          pr: 1,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={props.icon}
            sx={{
              width: 100,
              height: 100,
              position: 'absolute',
              left: -30,
              top: -15,
            }}
          />

          <Stack direction="column">
            <Typography
              variant="h6"
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
