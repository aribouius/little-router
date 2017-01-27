# API Reference

### `match({ routes, path, [context] })` => `any`
Matches an array of routes to a provided URL path. A context object may optionally be provided to pass to matched routes that define a [resolve method](overview.md#route-resolution).
```javascript
import { match } from 'little-router'

const routes = [{
  path: '/',
  greeting: 'Hello',
  resolve: (route, ctx) => (
    `${route.greeting} ${ctx.name}!`
  )
}]

match({ routes, path: '/', context: { name: 'World' } })
// => 'Hello World!'
```

### `createRouter({ routes, [context] })` => `router`
Creates a router instance bound to a specific route configuration and context.
```javascript
const { createRouter } from 'little-router'

const router = createRouter({
  routes: [...],
  context: {...}
})
```

### `router.match(path)` => `any`
Matches a provided URL path against the routes configured on the router.
