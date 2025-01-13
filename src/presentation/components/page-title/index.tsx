import React from 'react'
import { Avatar, Card, CardContent, Slide, Stack, Typography } from '@mui/material'

type PageTitleProps = {
  title: string
  subtitle: string
  icon: string
}

export const PageTitle: React.FC<PageTitleProps> = (props) => {
  return (
    <Slide direction="left" in mountOnEnter unmountOnExit>
      <Card sx={{ mx: 3, mb: 2, pb: 0, boxShadow: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" pl='18%'>
            <Avatar src={props.icon} sx={{ width: 110, height: 110, position: 'absolute', left: -8 }} />

            <Stack direction="column">
              <Typography variant="h6">{props.title}</Typography>
              <Typography variant="body2" color="grey.500" lineHeight={1}>
                {props.subtitle}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Slide>
  )
}
