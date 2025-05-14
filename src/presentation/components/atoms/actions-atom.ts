import { atom } from 'recoil'
import { Action } from '@/presentation/hooks/use-actions'

export const actionsState = atom({
  key: 'actionsState',
  default: [] as Action[],
})
