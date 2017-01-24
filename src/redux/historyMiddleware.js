import { change } from './actions'
import { PUSH, REPLACE, LOCATION_CHANGE } from './const'

export default (history = window.history) => store => {
  const methods = {
    [PUSH]: 'pushState',
    [REPLACE]: 'replaceState',
  }

  window.addEventListener('popstate', () => {
    store.dispatch(change(window.location))
  })

  return next => action => {
    if (action.type === LOCATION_CHANGE) {
      const { method, location } = action
      if (methods[method]) {
        // TODO: add support for state object & title
        history[methods[method]]({}, null, location.href)
      }
    }
    return next(action)
  }
}
