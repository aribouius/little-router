import { expect } from 'chai'
import sinon from 'sinon'
import createRouter from '../createRouter'

describe('createRoute', () => {
  const routes = [{ foo: 'foo' }]
  const location = { pathname: 'foo' }

  describe('match', () => {
    it('calls the configured matcher', () => {
      const match = sinon.spy()
      const router = createRouter(routes, { match })
      router.match(location)
      expect(match.calledWith(location)).to.equal(true)
    })
  })

  describe('resolve', () => {
    const match = () => routes

    it('calls the configured resolver', () => {
      const resolve = sinon.spy()
      const router = createRouter(routes, { match, resolve })
      router.resolve(location)
      expect(resolve.calledWith(routes)).to.equal(true)
    })

    it('passes a context to the resolver', () => {
      const resolve = sinon.spy()
      const context = { bar: 'bar' }
      const router = createRouter(routes, { match, resolve, context })
      router.resolve(location)
      expect(resolve.calledWith(routes, context)).to.equal(true)
    })
  })
})
