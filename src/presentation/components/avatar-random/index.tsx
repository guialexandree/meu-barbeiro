import React from 'react'
import { Avatar } from '@mui/material'
import avataaars1 from '@/presentation/assets/avatars/avataaars1.svg'
import avataaars2 from '@/presentation/assets/avatars/avataaars2.svg'
import avataaars3 from '@/presentation/assets/avatars/avataaars3.svg'
import avataaars4 from '@/presentation/assets/avatars/avataaars4.svg'
import avataaars5 from '@/presentation/assets/avatars/avataaars5.svg'
import avataaars6 from '@/presentation/assets/avatars/avataaars6.svg'
import avataaars7 from '@/presentation/assets/avatars/avataaars7.svg'

export const imgRandom = [
  avataaars1,
  avataaars2,
  avataaars3,
  avataaars4,
  avataaars5,
  avataaars6,
  avataaars7,
]

export const getRandomAvatar = () => {
  return imgRandom[Math.floor(Math.random() * imgRandom.length)]
}

type AvatarRandomProps = {
  size?: number
}

const AvatarRandom: React.FC<AvatarRandomProps> = (props) => {
  return (
    <Avatar
      src={getRandomAvatar()}
      sx={{ width: props.size || 32, height: props.size || 32 }}
    />
  )
}

export default React.memo(AvatarRandom)
