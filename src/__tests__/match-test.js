import { expect } from 'chai'
import match from '../match'
import Location from '../Location'

describe('match', () => {
  const route1 = { path: '/foo', name: 'foo' }
  const route2 = { path: '/bar/:bar', name: 'bar' }
  const route3 = { path: '/baz', routes: [{ path: '/:baz', name: 'baz' }] }

  it('returns a matched route', () => {
    const result = match('/foo', [route1]) || {}
    expect(result.name).to.eql('foo')
  })

  it('returns named route params', () => {
    const result = match('/bar/bar', [route2]) || {}
    expect(result.params).to.eql({ bar: 'bar' })
  })

  it('matches nested routes', () => {
    const result = match('/baz/baz', [route3]) || {}
    expect(result.name).to.eql('baz')
  })

  it('supplies a `location` context', () => {
    const path = '/foo?foo=bar'
    const location = new Location(path)
    const result = match(path, [{ path: '/foo', resolve: (_, ctx) => ctx.location }])
    expect(result).to.eql(location)
  })

  it('appends a custom context', () => {
    const routes = [{ path: '/foo', resolve: (_, ctx) => ctx.foo }]
    const result = match('/foo', routes, { foo: 'foo' })
    expect(result).to.eql('foo')
  })
})