import { expect } from 'chai'
import Router from '../Router'

describe('Router', () => {
  const routes = [{
    path: '/foo',
    name: 'foo',
    resolve: (route, ctx) => ({ ...route, ...ctx }),
  }]

  describe('match', () => {
    it('applies configured routes', () => {
      const router = new Router(routes)
      const result = router.match('/foo') || {}
      expect(result.name).to.equal('foo')
    })

    it('applies configured context', () => {
      const router = new Router(routes, { bar: 'bar' })
      const result = router.match('/foo') || {}
      expect(result.bar).to.equal('bar')
    })
  })
})
