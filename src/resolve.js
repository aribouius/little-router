const noop = () => {}

export default (matches, context = {}) => {
  let index
  let params = {}

  const route = matches.reduceRight((next, match) => (() => {
    index = match.index
    params = { ...params, ...match.params }

    if (match.route.resolve) {
      return match.route.resolve({ ...context, ...match, next })
    } else {
      return next === noop ? match.route : next()
    }
  }), noop)()

  if (!route) {
    return undefined
  }

  if (typeof route.then === 'function') {
    return route.then(result => ({ route: result, params, index }))
  }

  return { route, params, index }
}
