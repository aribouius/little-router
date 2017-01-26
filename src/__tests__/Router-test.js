import { expect } from 'chai'
import createRouter from '../createRouter'

describe('Router', () => {
  const routes = [{
    path: '/foo',
    name: 'foo',
    resolve: (route, ctx) => ({ ...route, ...ctx }),
  }]

  describe('match', () => {
    it('applies configured routes', () => {
      const router = createRouter({ routes })
      const result = router.match('/foo') || {}
      expect(result.name).to.equal('foo')
    })

    it('applies configured context', () => {
      const router = createRouter({ routes, context: { bar: 'bar' } })
      const result = router.match('/foo') || {}
      expect(result.bar).to.equal('bar')
    })
  })
})
