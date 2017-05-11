import patternMatcher from './patternMatcher'

const matchPattern = patternMatcher()

export default function matchRoutes({
  strict,
  routes,
  path: pathname,
  basePath,
  params = {},
  results = [],
  baseIndex = '',
  matcher = matchPattern,
}) {
  routes.some((route, index) => {
    const { path = '/', routes: children } = route
    const exact = !children

    let pattern
    if (basePath) {
      pattern = path === '/' ? basePath : `${basePath}${path}`.replace(/\/{2,}/g, '/')
    } else {
      pattern = path
    }

    const matched = matcher(pattern, pathname, { exact, strict })
    if (!matched) return false

    const result = {
      route,
      path: matched.path,
      index: baseIndex ? `${baseIndex}.${index}` : `${index}`,
      params: { ...params, ...matched.params },
    }

    const nested = []

    if (children) {
      matchRoutes({
        strict,
        routes: children,
        path: pathname,
        basePath: result.path,
        params: result.params,
        baseIndex: result.index,
        results: nested,
        matcher,
      })
    }

    if (exact || nested.length) {
      return results.push(result, ...nested)
    }

    return false
  })

  return results
}
