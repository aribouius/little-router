export default async (routes, ctx) => (
  Promise.all(routes.map(async ({ resolve, ...route }) => (
    typeof resolve === 'function' ? resolve(route, ctx) : route
  )))
)
