import patternMatcher from './patternMatcher'

const matchPattern = patternMatcher()

export default function matchRoutes(routes, pathname, basePath, params = {}, results = []) {
  routes.some(route => {
    const { path = '/', routes: children } = route
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
    const result = {
      route,
      path: matched.path,
      params: { ...params, ...matched.params },
    }

    if (children) {
      matchRoutes(children, pathname, result.path, result.params, nested)
    }

    if (exact || nested.length) {
      return results.push(result, ...nested)
    }

    return false
  })

  return results
}
