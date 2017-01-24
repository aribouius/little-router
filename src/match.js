import resolve from './resolve'
import Location from './Location'
import matchRoutes from './matchRoutes'

export default function match(path, routes, context = {}) {
  const location = new Location(path)
  return resolve(matchRoutes(location.pathname, routes), {
    location,
    ...context,
  })
}
