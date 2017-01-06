import parse from './parseLocation'
import { GO, POP, PUSH, REPLACE, LOCATION_CHANGE } from './const'

export const change = (
  location,
  method = POP,
) => ({
  method,
  type: LOCATION_CHANGE,
  location: parse(location),
})

export const pop = location => (
  change(location)
)

export const push = location => (
  change(location, PUSH)
)

export const replace = location => (
  change(location, REPLACE)
)

export const go = index => ({ type: GO, index })
export const back = () => go(-1)
export const forward = () => go(1)
