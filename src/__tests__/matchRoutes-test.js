import { expect } from 'chai'
import match from '../matchRoutes'

describe('matchRoutes', () => {
  it('returns an array', () => {
    const result = match([], '/')
    expect(result).to.eql([])
  })

  it('returns matched routes', () => {
    const routes = [{ path: '/foo', name: 'foo' }]
    const result = match(routes, '/foo')
    expect(result).to.eql([{
      route: routes[0],
      path: '/foo',
      params: {},
    }])
  })

  it('stops matching after the first exact match', () => {
    const routes = [
      { path: '/foo', name: 'foo' },
      { path: '/foo', name: 'bar' },
    ]
    const result = match(routes, '/foo')
    expect(result).to.eql([{
      route: routes[0],
      path: '/foo',
      params: {},
    }])
  })

  it('matches nested routes', () => {
    const routes = [{
      path: '/foo',
      name: 'foo',
      routes: [{
        path: '/bar',
        name: 'bar',
      }],
    }]
    const result = match(routes, '/foo/bar')
    expect(result).to.eql([
      { route: routes[0], path: '/foo', params: {} },
      { route: routes[0].routes[0], path: '/foo/bar', params: {} },
    ])
  })

  it('handles nested index routes', () => {
    const routes = [{
      name: 'foo',
      path: '/',
      routes: [{
        path: '/',
        name: 'bar',
      }],
    }]
    const result = match(routes, '/')
    expect(result).to.eql([
      { route: routes[0], path: '/', params: {} },
      { route: routes[0].routes[0], path: '/', params: {} },
    ])
  })

  it('does not require a path for parent or index routes', () => {
    const routes = [{
      name: 'foo',
      routes: [{
        path: '/bar',
        name: 'bar',
        routes: [{
          name: 'baz',
        }],
      }],
    }]
    const result = match(routes, '/bar')
    expect(result).to.eql([
      { route: routes[0], path: '/', params: {} },
      { route: routes[0].routes[0], path: '/bar', params: {} },
      { route: routes[0].routes[0].routes[0], path: '/bar', params: {} },
    ])
  })

  it('returns route params', () => {
    const routes = [{
      path: '/:foo',
      routes: [{
        path: '/:bar',
      }],
    }]
    const result = match(routes, '/foo/bar')
    expect(result).to.eql([
      { route: routes[0], path: '/foo', params: { foo: 'foo' } },
      { route: routes[0].routes[0], path: '/foo/bar', params: { foo: 'foo', bar: 'bar' } },
    ])
  })

  it('returns the matched path', () => {
    const routes = [{
      path: '/foo',
      routes: [{
        path: '/bar',
      }],
    }]
    const result = match(routes, '/foo/bar')
    expect(result).to.eql([
      { route: routes[0], path: '/foo', params: {} },
      { route: routes[0].routes[0], path: '/foo/bar', params: {} },
    ])
  })

  it('returns the original route object', () => {
    const routes = [{
      path: '/foo',
      routes: [{
        path: '/bar',
      }],
    }]
    const result = match(routes, '/foo/bar')
    expect(result[0].route).to.equal(routes[0])
    expect(result[1].route).to.equal(routes[0].routes[0])
  })
})
