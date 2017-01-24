import match from './match'

export default class Router {
  constructor(routes, context = {}) {
    this.routes = routes
    this.context = context
  }

  match(location) {
    return match(location, this.routes, this.context)
  }
}
