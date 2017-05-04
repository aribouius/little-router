import { expect } from 'chai'
import createRouter from '../createRouter'

describe('Router', () => {
  const routes = [{
    path: '/foo',
    name: 'foo',
    resolve: ctx => ({
      ...ctx.route,
      ...ctx.custom,
    }),
  }]

  describe('match', () => {
    it('applies configured routes', () => {
      const router = createRouter({ routes })
      const result = router.match('/foo') || {}
      expect(result.route).to.eql(routes[0])
    })

    it('applies configured context', () => {
      const router = createRouter({ routes, context: { custom: { bar: 'bar' } } })
      const result = router.match('/foo') || {}
      expect(result.route).to.eql({ ...routes[0], bar: 'bar' })
    })
  })
})
