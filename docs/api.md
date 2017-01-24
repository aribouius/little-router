# API Reference

#### `match({ routes, path, [context] })` => `any`
Matches an array of routes to a provided URL path. An optional context object is provided to any matched routes containing a [resolve method](overview.md#route-resolution).
```javascript
import { match } from 'little-router'
import { api } from './Api'

const routes: [
  {
    path: '/',
    name: 'home',
  },
  {
    path: '/:slug',
    name: 'page',
    resolve: async (route, context) => {
      return {
        ...route,
        page: await context.api.findPageBySlug(route.params.slug)
      }
    }
  },
]

const route = await match({
  path: '/about',
  context: { api },
  routes,
})
// => { path: '/about', name: 'page', params: { slug: 'about' }, page: { ... } }
```

#### `createRouter({ routes, [context] })` => `router`
Creates a new router instance bound to a given route configuration and context.
```javascript
const { createRouter } from 'little-router'

const router = createRouter({ ... })

router.match('/some/path')
```
