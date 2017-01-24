# Overview
This router was inspired by the route configuration used by [react-router](https://github.com/ReactTraining/react-router), and the middleware pattern implemented by frameworks such as [Express](http://expressjs.com) or [Koa](http://koajs.com).  It was built to be flexible enough to support both basic static route matching, as well as more advanced asynchronous route resolution/fulfillment.

## Route Building

Routes are declared as an array of plain objects that get matched in the order they were specified. Each route object can take any desired shape, with the exception of a few _special_ properties used by the router. The first such property is the `path` key, which indicates the URL path to use when matching the route using the [path-to-regexp](https://github.com/pillarjs/path-to-regexp) library.
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

### Route Nesting
Routes can be nested by specifying a `routes` property.
```javascript
const routes = [
  {
    path: '/admin',
    routes: [
      {
        path: '/',
        content: 'Admin Dashboard!',
      },
      {
        path: '/users',
        content: 'Admin Users!',
      }
    ]
  }
]
```
### Named Parameters
Captured route parameters get added to the matched route via a `params` property.

```javascript
import { match } from 'little-router'

const routes = [
  {
    path: '/:slug',
    name: 'page',
  }
]

match({ routes, path: '/about' })
// => { path: '/about', name: 'page', params: { slug: 'about' } }
```


### Route Resolution
Each route can specify a `resolve` function to alter the result returned by the router.  This can be used to modify the returned route object, asynchronously fetch additional route data, or anything else required to resolve the route.

```javascript
import { match } from 'little-router'

const routes = [
  {
    path: '/users/:id',
    resolve: (route) => {
      return {
        ...route,
        user: findUserById(route.params.id)
      }
    }
  },
]

match({ routes, path: '/users/42' })
// => { path: '/users/42', params: { id: '42' }, user: { ... } }
```
