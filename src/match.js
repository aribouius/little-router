import resolve from './resolve'
import matchRoutes from './matchRoutes'

export default function match(path, routes, context = {}) {
  return resolve(matchRoutes(path, routes), context)
}
