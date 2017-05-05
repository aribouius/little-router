import patternMatcher from './patternMatcher'

const matchPattern = patternMatcher()

export default function matchRoutes(routes, pathname, basePath, params = {}, results = [], baseKey = '') {
  routes.some((route, key) => {
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

    const result = {
      route,
      path: matched.path,
      params: { ...params, ...matched.params },
      __key__: baseKey ? `${baseKey}.${key}` : `${key}`,
    }

    const nested = []

    if (children) {
      matchRoutes(
        children,
        pathname,
        result.path,
        result.params,
        nested,
        result.__key__,
      )
    }

    if (exact || nested.length) {
      return results.push(result, ...nested)
    }

    return false
  })

  return results
}
