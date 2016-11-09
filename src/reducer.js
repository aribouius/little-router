import { LOCATION_CHANGE, ROUTE_CHANGE } from './const'

export const initialState = {
  params: {},
  transitioning: false,
  location: {
    href: null,
    search: null,
    pathname: null,
    query: {},
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return { ...state, transitioning: true, location: { ...action.location } }
    case ROUTE_CHANGE:
      return { ...state, transitioning: false }
    default:
      return state
  }
}
