import React from 'react'
import { Avatar } from '@mui/material'
import avataaars1 from '@/presentation/assets/avatars/avataaars1.svg'
import avataaars2 from '@/presentation/assets/avatars/avataaars2.svg'
import avataaars3 from '@/presentation/assets/avatars/avataaars3.svg'
import avataaars4 from '@/presentation/assets/avatars/avataaars4.svg'
import avataaars5 from '@/presentation/assets/avatars/avataaars5.svg'
import avataaars6 from '@/presentation/assets/avatars/avataaars6.svg'
import avataaars7 from '@/presentation/assets/avatars/avataaars7.svg'
import faker from 'faker'

const AvatarRandom: React.FC = () => {
  return (
    <Avatar
      src={faker.random.arrayElement([avataaars1, avataaars2, avataaars3, avataaars4, avataaars5, avataaars6, avataaars7])}
      sx={{ width: 32, height: 32 }}
    />
  )
}

export default React.memo(AvatarRandom)
