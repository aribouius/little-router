import { expect } from 'chai'
import createMatcher from '../createMatcher'

describe('createMatcher', () => {
  let match

  beforeEach(() => {
    match = createMatcher()
  })

  describe('match', () => {
    it('returns an object when pattern is matched', () => {
      const result = match('/foo', { pathname: '/foo' })
      expect(result).to.be.an('object')
    })

    it('returns null when pattern is not matched', () => {
      const result = match('/foo', { pathname: '/bar' })
      expect(result).to.equal(null)
    })

    it('returns named params', () => {
      const result = match('/:foo/:bar', { pathname: '/foo/bar' })
      expect(result.params).to.eql({ foo: 'foo', bar: 'bar' })
    })

    it('returns pathname', () => {
      const result = match('/:foo/:bar', { pathname: '/foo/bar' })
      expect(result.pathname).to.eql('/foo/bar')
    })

    it('matches pattern exactly by default', () => {
      const result = match('/foo', { pathname: '/foo/' })
      expect(result).to.equal(null)
    })

    it('optionally matches pattern loosely', () => {
      const result = match('/foo', { pathname: '/foo/bar' }, { exact: false })
      expect(result).to.not.equal(null)
    })
  })
})
