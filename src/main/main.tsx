import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from '@/main/router'
import '@/main/configs/clarity'
import '@/presentation/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
