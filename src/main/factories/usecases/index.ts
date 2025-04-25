export * from './authentication'
export * from './alerts'
export * from './companies'
export * from './services'
export * from './users'

import * as autehntication from './authentication'
import * as alerts from './alerts'
import * as companies from './companies'
import * as services from './services'
import * as users from './users'

export const Factories = {
  ...autehntication,
  ...alerts,
  ...companies,
  ...services,
  ...users,
}
