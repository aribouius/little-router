import patternMatcher from './patternMatcher'

const matchPattern = patternMatcher()

export default function matchRoutes(pathname, routes, basePath, params = {}, results = []) {
  routes.some(props => {
    const { path = '/', routes: children, ...route } = props

    const exact = !children
    const pattern = basePath ? `${basePath}/${path}`.replace(/\/{2,}/g, '/') : path
    const matched = matchPattern(pattern, pathname, { exact })

    if (!matched) return false

    const nested = []
    route.params = { ...params, ...matched.params }

    if (children) {
      matchRoutes(pathname, children, matched.pathname, route.params, nested)
    }

    if (exact || nested.length) {
      return results.push(route, ...nested)
    }

    return false
  })

  return results
}
