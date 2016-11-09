import { bindActionCreators } from 'redux'
import { go, pop, push, replace, routeChange } from './actions'
import match from './matchLocation'

const getState = store => store.getState().reducer

export default function Router(store, routes = [], options = {}) {
  this.config = { getState, ...options }
  this.routes = []

  Object.assign(this, bindActionCreators({ go, pop, push, replace }, store.dispatch))

  store.subscribe(() => {
    const state = this.config.getState(store)
    if (!state) {
      throw new Error('router state not found!')
    } else if (state.transitioning) {
      this.routes = match(state.location, routes)
      store.dispatch(routeChange(this.routes))
    }
  })
}
