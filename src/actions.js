import parse from './parseLocation'
import { GO, POP, PUSH, REPLACE, LOCATION_CHANGE, ROUTE_CHANGE } from './const'

export const routeChange = routes => (
  { type: ROUTE_CHANGE, routes }
)

const changeLocation = method => location => (
  { type: LOCATION_CHANGE, location: parse(location), method }
)

export const go = index => (
  { type: GO, index }
)

export const pop = changeLocation(POP)
export const push = changeLocation(PUSH)
export const replace = changeLocation(REPLACE)
export const back = () => go(-1)
export const forward = () => go(1)
