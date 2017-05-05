import patternMatcher from './patternMatcher'

const matchPattern = patternMatcher()

export default function matchRoutes(
  routes,
  pathname,
  basePath,
  params = {},
  results = [],
  baseIndex = '',
) {
  routes.some((route, index) => {
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
      index: baseIndex ? `${baseIndex}.${index}` : `${index}`,
      params: { ...params, ...matched.params },
    }

    const nested = []

    if (children) {
      matchRoutes(
        children,
        pathname,
        result.path,
        result.params,
        nested,
        result.index,
      )
    }

    if (exact || nested.length) {
      return results.push(result, ...nested)
    }

    return false
  })

  return results
}
