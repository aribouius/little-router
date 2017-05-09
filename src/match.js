import resolve from './resolve'
import matchRoutes from './matchRoutes'

export default function match({ context = {}, ...options }) {
  return resolve(matchRoutes(options), context)
}
