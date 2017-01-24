const noop = () => {}

export default (routes, ctx = {}) => (
  routes.reduceRight((next, { resolve, ...route }) => (() => {
    if (resolve) {
      return resolve(route, Object.assign(ctx, { next }))
    } else {
      return next === noop ? route : next()
    }
  }), noop)()
)
