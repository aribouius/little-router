import { expect } from 'chai'
import sinon from 'sinon'
import createRouter from '../createRouter'

describe('createRoute', () => {
  const routes = [{ foo: 'foo' }]
  const location = { pathname: 'foo' }

  describe('match', () => {
    it('calls the configured matcher', () => {
      const matcher = sinon.spy()
      const router = createRouter(routes, { matcher })
      router.match(location)
      expect(matcher.calledWith(location)).to.equal(true)
    })
  })

  describe('resolve', () => {
    const matcher = () => routes

    it('calls the configured resolver', () => {
      const resolver = sinon.spy()
      const router = createRouter(routes, { matcher, resolver })
      router.resolve(location)
      expect(resolver.calledWith(routes)).to.equal(true)
    })

    it('passes a context to the resolver', () => {
      const resolver = sinon.spy()
      const context = { bar: 'bar' }
      const router = createRouter(routes, { matcher, resolver, context })
      router.resolve(location)
      expect(resolver.calledWith(routes, context)).to.equal(true)
    })
  })
})
