# Overview
`little-router` was inspired by the route configuration used by [react-router](https://github.com/ReactTraining/react-router), and the middleware pattern implemented by frameworks such as [Express](http://expressjs.com) or [Koa](http://koajs.com).  It was built to be flexible enough to support both static route matching, as well as asynchronous route resolution/fulfillment.

### Route Configuration
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

### Route Matching
The router traverses the route configuration array until a route is found that matches the provided path. If a route is matched, the route object is returned, else `undefined`.
```javascript
import { match } from 'little-router'

const routes = [
  { path: '/about', name: 'about' }
]

match({ routes, path: '/about' })
// => { path: '/about', name: 'about' }
```

### Named Parameters
Named route parameters can be accessed via a `params` property on the matched route object.
```javascript
import { match } from 'little-router'

const routes = [
  { path: '/:slug', name: 'page' }
]

match({ routes, path: '/about' })
// => { path: '/about', name: 'page', params: { slug: 'about' } }
```

### Route Resolution
Each route may specify a `resolve` function, which can be used to either customize the route return value, or to perform actions required to resolve the route.  The route object is provided as the first argument.
```javascript
import { match } from 'little-router'
import { fetchContent } from './fetchContent'

const routes = [
  {
    path: '/',
    resolve: () => 'Hello World!'
  },
  {
    path: '/about',
    resolve: async (route) => ({
      ...route,
      content: await fetchContent('about') // "About Page"
    })
  }
]

match({ routes, path: '/' })
// => 'Hello World!'

await match({ routes, path: '/about' })
// => { path: '/about', content: "About Page" }
```

### Route Context
A context object may be provided to pass to each route's `resolve` method.
```javascript
import { match } from 'little-router'

const routes = [{
  path: '/admin',
  resolve: (route, ctx) => {
    if (!ctx.loggedIn) {
      throw new Error('Unauthorized!')
    }
    return route
  }
}]

match({
  routes,
  path: '/about',
  context: {
    loggedIn: true
  }
})
```

### Route Nesting
Routes can be nested by defining a `routes` property.
```javascript
const routes = [
  {
    path: '/admin',
    routes: [
      {
        path: '/',
        name: 'admin_dashboard',
      },
      {
        path: '/users',
        name: 'admin_users'
      }
    ]
  }
]
```

### Middleware
Parent routes that define a `resolve` method are responsible for resolving child routes by acting as middleware.
```javascript
import { match } from 'little-router'

const routes = [{
  path: '/admin',
  layout: 'default',
  resolve: (route, ctx) => {
    const child = ctx.next()
    return { ...route, ...child }
  },
  routes: [
    {
      path: '/',
      view: 'dashboard',
    }
  ]
}]

match({ routes, path: '/admin' })
// => { path: '/admin', layout: 'default', view: 'dashboard' }
```
