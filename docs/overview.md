# Overview
`little-router` was inspired by the route configuration used by [react-router](https://github.com/ReactTraining/react-router), and the middleware pattern implemented by frameworks such as [Express](http://expressjs.com) or [Koa](http://koajs.com).  It was built to be flexible enough to support both static route matching, as well as asynchronous route resolution.

### Route Config
Routes are declared as an array of plain objects. Each route object can take any desired shape, with the exception of a few _special_ properties used by the router. One such property is `path`, which indicates the URL path to use when matching the route (using the [path-to-regexp](https://github.com/pillarjs/path-to-regexp) library).
```javascript
const routes = [
  {
    path: '/',
    name: 'home',
  },
  {
    path: '/about',
    name: 'about',
  }
]
```

### Nested Routes
Each route can optionally specify a `routes` property to list child routes.
```javascript
const routes = [
  {
    path: '/admin',
    routes: [
      {
        path: '/',
        name: 'dashboard',
      },
      {
        path: '/users',
        name: 'users'
      }
    ]
  }
]
```

### Route Matching
The router traverses the route configuration array until a route is matched against the provided path. If a match is found, a result object containing the matched route is returned, else `undefined`.
```javascript
import { match } from 'little-router'

const routes = [
  { path: '/about', name: 'about' }
]

const result = match({ routes, path: '/about' })
// => { route: { name: 'about' } }
```

### Named Parameters
Captured named route parameters are also returned in the result object.
```javascript
import { match } from 'little-router'

const routes = [
  { path: '/:slug', name: 'page' }
]

const result = match({ routes, path: '/about' })
// => { route: { name: 'page' }, params: { slug: 'about' } }
```

### Route Resolution
Routes can specify a `resolve` function to asynchronously resolve the route.  The function is passed a context argument containing the static route object, and named parameters.
```javascript
import { match } from 'little-router'
import { fetchContent } from './fetchContent'

const routes = [
  {
    path: '/about',
    name: 'about',
    resolve: async ({ route, params }) => ({
      ...route,
      component: import(`./components/About`),
    }),
  }
]

const result = await match({ routes, path: '/about' })
// => { route: { name: 'about', component: About } }
```

### Route Context
Arbitrary data can be passed to the `route.resolve()` method via the `context` option.

```javascript
import { match } from 'little-router'

const routes = [{
  path: '/admin',
  resolve: ({ route, admin }) => {
    if (!admin) {
      throw new Error('Unauthorized!')
    }
    return route
  }
}]

match({
  routes,
  path: '/admin',
  context: {
    admin: true,
  }
})
```


### Middleware
Parent routes that define a `resolve` function are responsible for resolving child routes by calling a middleware style `next()` function provided by the context argument.

```javascript
import { match } from 'little-router'

const routes = [{
  path: '/admin',
  resolve: ({ route, next }) => {
    return {
      layout: 'default',
      ...next(),
    }
  },
  routes: [{
    path: '/',
    view: 'dashboard',
  }]
}]

const result = match({ routes, path: '/admin' })
// => { route: { layout: 'default', view: 'dashboard' } }
```
