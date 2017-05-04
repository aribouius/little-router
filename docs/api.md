# API Reference

### `match({ routes, path, [context] })` => `any`
Matches an array of routes against a URL path. A context object can optionally be provided for routes that define a [resolve method](overview.md#route-resolution).
```javascript
import { match } from 'little-router'

const routes = [{
  path: '/',
  resolve: ({ name }) => ({
    body: `Hello ${name}!`
  })
}]

match({ routes, path: '/', context: { name: 'World' } })
// => { route: { body: 'Hello World!' } }
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
