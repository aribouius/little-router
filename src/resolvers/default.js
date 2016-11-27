export default async (routes, ctx) => (
  Promise.all(routes.map(async ({ resolve, ...route }) => (
    typeof resolve === 'function'
     ? Object.assign(route, await resolve(route, ctx))
     : route
  )))
)
