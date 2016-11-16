import { LOCATION_CHANGE } from './const'

export const initialState = {
  href: null,
  hash: null,
  search: null,
  pathname: null,
  query: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return { ...state, ...action.location }
    default:
      return state
  }
}
