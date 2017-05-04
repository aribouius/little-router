import { expect } from 'chai'
import resolve from '../resolve'

describe('resolve', () => {
  it('returns undefined when given empty array', () => {
    expect(resolve([])).to.equal(undefined)
  })

  it('returns the matched route and named params', () => {
    const matches = [{ route: { name: 'foo' }, params: { bar: 'bar' } }]
    expect(resolve(matches)).to.eql(matches[0])
  })

  it('returns the last matched route', () => {
    const matches = [{ route: {} }, { route: {} }]
    expect(resolve(matches).route).to.equal(matches[1].route)
  })

  it('handles a `resolve` method', () => {
    const route = { name: 'foo' }
    const matches = [{ route: { resolve: () => route } }]
    expect(resolve(matches).route).to.eql(route)
  })

  it('handles async `resolve` methods', async () => {
    const route = { name: 'foo' }
    const matches = [{ route: { resolve: async () => route } }]
    expect(await resolve(matches).route).to.eql(route)
  })

  it('passes context object to resolve methods', () => {
    const route = { resolve: ctx => ctx }
    const matches = [{ route }]
    expect(resolve(matches).route).to.be.a('object')
  })

  it('passes route to `resolve` methods', () => {
    const route = { name: 'foo', resolve: ctx => ctx.route }
    const matches = [{ route }]
    expect(resolve(matches).route).to.eql(route)
  })

  it('passes path to `resolve` methods', () => {
    const path = '/foo'
    const route = { resolve: ctx => ctx.path }
    const matches = [{ route, path }]
    expect(resolve(matches).route).to.eql(path)
  })

  it('passes params to `resolve` methods', () => {
    const params = '/foo'
    const route = { resolve: ctx => ctx.params }
    const matches = [{ route, params }]
    expect(resolve(matches).route).to.eql(params)
  })

  it('passes next function to `resolve` methods', () => {
    const route = { resolve: ctx => ctx.next }
    const matches = [{ route }]
    expect(resolve(matches).route).to.be.a('function')
  })

  it('yields child route resolution to next function', () => {
    const matches = [
      { route: { resolve: ctx => ({ ...ctx.next(), foo: 'foo' }) } },
      { route: { bar: 'bar' } },
    ]
    expect(resolve(matches).route).to.eql({
      foo: 'foo',
      bar: 'bar',
    })
  })
})
