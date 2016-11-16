import createMatcher from './createMatcher'

const matchPattern = createMatcher()

export default function match(location, routes, parent, results = []) {
  routes.some(props => {
    const { path, routes: children, exact = !children, ...route } = props

    const pattern = parent ? `${parent.pathname}/${path}`.replace(/\/{2,}/g, '/') : path
    const matched = matchPattern(pattern, location, { exact })
    const matches = []

    if (!matched) {
      return false
    }

    if (children) {
      match(location, children, matched, matches)
    }

    if (exact || matches.length) {
      results.push({ ...route, ...matched }, ...matches)
      return true
    }

    return false
  })

  return results
}
