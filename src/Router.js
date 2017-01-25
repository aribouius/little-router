import match from './match'

export default class Router {
  constructor({ routes, context = {} }) {
    this.routes = routes
    this.context = context
  }

  match(path) {
    return match(path, this.routes, this.context)
  }
}
