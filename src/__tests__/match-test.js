import { expect } from 'chai'
import match from '../match'

describe('match', () => {
  const route1 = { path: '/foo', name: 'foo' }
  const route2 = { path: '/bar/:bar', name: 'bar' }
  const route3 = { path: '/baz', routes: [{ path: '/:baz', name: 'baz' }] }

  it('returns a matched route', () => {
    const path = '/foo'
    const routes = [route1]
    const result = match({ routes, path }) || {}
    expect(result.name).to.eql('foo')
  })

  it('returns named route params', () => {
    const path = '/bar/bar'
    const routes = [route2]
    const result = match({ routes, path }) || {}
    expect(result.params).to.eql({ bar: 'bar' })
  })

  it('matches nested routes', () => {
    const path = '/baz/baz'
    const routes = [route3]
    const result = match({ routes, path }) || {}
    expect(result.name).to.eql('baz')
  })

  it('appends a custom context', () => {
    const path = '/foo'
    const routes = [{ path, resolve: (_, ctx) => ctx.foo }]
    const result = match({ path, routes, context: { foo: 'foo' } })
    expect(result).to.eql('foo')
  })
})
