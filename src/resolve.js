const noop = () => {}

export default (matches, context = {}) => {
  const params = {}

  const route = matches.reduceRight((next, match) => (() => {
    Object.assign(params, match.params)
    if (match.route.resolve) {
      return match.route.resolve({ ...context, ...match, next })
    } else {
      return next === noop ? match.route : next()
    }
  }), noop)()

  return route ? { route, params } : undefined
}
