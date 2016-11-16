import parse from './parseLocation'
import { GO, POP, PUSH, REPLACE, LOCATION_CHANGE } from './const'

const change = method => location => (
  { method, type: LOCATION_CHANGE, location: parse(location) }
)

export const pop = change(POP)
export const push = change(PUSH)
export const replace = change(REPLACE)

export const go = index => ({ index, type: GO })
export const back = () => go(-1)
export const forward = () => go(1)
