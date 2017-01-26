const noop = () => {}

export default (routes, context = {}) => {
  const ctx = { ...context }
  return routes.reduceRight((next, { resolve, ...route }) => (() => {
    if (resolve) {
      ctx.next = next
      return resolve(route, ctx)
    } else {
      return next === noop ? route : next()
    }
  }), noop)()
}
