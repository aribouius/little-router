import resolve from './resolve'
import matchRoutes from './matchRoutes'

export default function match({ routes, path, context = {} }) {
  return resolve(matchRoutes(routes, path), context)
}
