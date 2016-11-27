import matchLocation from './match'
import resolveRoutes from './resolvers/default'

export default function createRouter(routes = [], options = {}) {
  const config = {
    match: matchLocation,
    resolve: resolveRoutes,
    ...options,
  }

  const match = location => (
    config.match(location, routes)
  )

  const resolve = location => (
    config.resolve(match(location), config.context)
  )

  return {
    match,
    resolve,
  }
}
