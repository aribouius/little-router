import { expect } from 'chai'
import resolve from '../resolve'

describe('resolve', () => {
  const route1 = { foo: 'foo' }
  const route2 = { bar: 'bar' }

  it('returns the last matched route', () => {
    const routes = [route1, route2]
    expect(resolve(routes)).to.eql(route2)
  })

  it('yields route resolution to a `resolve` method', () => {
    const routes = [{ ...route1, resolve: () => route2 }]
    expect(resolve(routes)).to.eql(route2)
  })

  it('supports async `resolve` methods', async () => {
    const routes = [{
      ...route1,
      resolve: async route => (
        await new Promise(done => setTimeout(() => done(route), 10))
      ),
    }]
    expect(await resolve(routes)).to.eql(route1)
  })

  it('provides `resolve` methods with a context', () => {
    const routes = [{
      ...route1,
      resolve: (_, ctx = {}) => ctx,
    }]
    expect(resolve(routes, route2)).to.eql(route2)
  })

  it('yields child route resolution to parent routes via `next` function', () => {
    const routes = [{
      resolve: (_, __, next) => ({
        ...next(),
        ...route1,
      }),
    }, {
      ...route2,
    }]
    expect(resolve(routes)).to.eql({ ...route1, ...route2 })
  })
})
