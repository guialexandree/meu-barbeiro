export * from './authentication'
export * from './alerts'
export * from './services'
export * from './clients'

import * as autehntication from './authentication'
import * as alerts from './alerts'
import * as services from './services'
import * as clients from './clients'

export const Factories = {
  ...autehntication,
  ...alerts,
  ...services,
  ...clients,
}
