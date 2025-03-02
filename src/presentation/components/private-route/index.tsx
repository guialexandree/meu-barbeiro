import React from 'react'
import { useNavigate,  } from 'react-router-dom'
import { useEffect } from 'react'

type PrivateRouteProps = {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const navigate = useNavigate()
  const validateToken = () => {
    const token = localStorage.getItem('accessToken')
    if (!token) return false

    const { exp } = JSON.parse(atob(token.split('.')[1]))
    if (Date.now() >= exp * 1000) return false

    return true
  }


  useEffect(() => {
    const validToken = validateToken()
    if (!validToken) navigate('/login')
  }, [navigate])

  return validateToken() ? <>{props.children}</> : null
}
