import React, { Suspense } from 'react'
import { PageLoader } from '@/presentation/components'

type LoadableProps = {
  children: React.ReactNode
}

export const Loadable: React.FC<LoadableProps> = (props) => {
  return (
    <Suspense fallback={<PageLoader loading />}>
      {props.children}
    </Suspense>
  )
}
