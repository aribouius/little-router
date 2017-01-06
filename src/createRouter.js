import matcher from './match'
import resolver from './resolvers/default'

export default function createRouter(routes = [], options = {}) {
  const config = {
    matcher,
    resolver,
    ...options,
  }

  const match = location => (
    config.matcher(location, routes)
  )

  const resolve = location => (
    config.resolver(match(location), config.context)
  )

  return {
    match,
    resolve,
  }
}
