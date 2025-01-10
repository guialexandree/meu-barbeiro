import React, { Suspense } from 'react'

type LoadableProps = {
  children: React.ReactNode
}

export const Loadable: React.FC<LoadableProps> = (props) => {
  return (
    <Suspense fallback={<>ai papai</>}>
      {props.children}
    </Suspense>
  )
}
