import { expect } from 'chai'
import sinon from 'sinon'
import resolve from '../default'

describe('resolvers/default', () => {
  it('returns a promise', () => {
    const result = resolve([{}])
    expect(result.then).to.be.a('function')
  })

  it('returns the matched route data', async () => {
    const result = await resolve([{ foo: 'foo' }])
    expect(result).to.eql([{ foo: 'foo' }])
  })

  it('passes a context to each route resolver', async () => {
    const spy = sinon.spy()
    const ctx = { foo: 'foo' }
    const routes = [{ bar: 'bar', resolve: spy }]
    resolve(routes, ctx)
    expect(spy.calledWith({ bar: 'bar' }, ctx)).to.equal(true)
  })

  it('returns the resolved route', async () => {
    const routes = [{
      foo: 'foo',
      resolve: () => Promise.resolve({ bar: 'bar' }),
    }]
    const result = await resolve(routes)
    expect(result).to.eql([{ bar: 'bar' }])
  })
})
