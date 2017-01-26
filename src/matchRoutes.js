import patternMatcher from './patternMatcher'

const matchPattern = patternMatcher()

export default function matchRoutes(routes, pathname, basePath, params = {}, results = []) {
  routes.some(props => {
    const { path = '/', routes: children, ...route } = props
    const exact = !children

    let pattern
    if (basePath) {
      pattern = path === '/' ? basePath : `${basePath}${path}`.replace(/\/{2,}/g, '/')
    } else {
      pattern = path
    }

    const matched = matchPattern(pattern, pathname, { exact })
    if (!matched) return false

    const nested = []
    route.path = matched.path
    route.params = { ...params, ...matched.params }

    if (children) {
      matchRoutes(children, pathname, route.path, route.params, nested)
    }

    if (exact || nested.length) {
      return results.push(route, ...nested)
    }

    return false
  })

  return results
}
