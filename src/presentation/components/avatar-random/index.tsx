import React from 'react'
import { Avatar } from '@mui/material'
import avataaars5 from '@/presentation/assets/avatars/avataaars5.svg'

const AvatarRandom: React.FC = () => {
  return (
    <Avatar
      src={avataaars5}
      sx={{ width: 32, height: 32 }}
    />
  )
}

export default React.memo(AvatarRandom)
