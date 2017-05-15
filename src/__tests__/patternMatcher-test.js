import { expect } from 'chai'
import patternMatcher from '../patternMatcher'

describe('patternMatcher', () => {
  it('returns a `matchPattern` function', () => {
    expect(patternMatcher()).to.be.a('function')
  })

  describe('matchPattern', () => {
    let matchPattern

    beforeEach(() => {
      matchPattern = patternMatcher()
    })

    it('returns an object when pattern is matched', () => {
      const result = matchPattern('/foo', '/foo')
      expect(result).to.be.an('object')
    })

    it('returns null when pattern is not matched', () => {
      const result = matchPattern('/foo', '/bar')
      expect(result).to.equal(null)
    })

    it('returns named params', () => {
      const result = matchPattern('/:foo/:bar', '/foo/bar')
      expect(result.params).to.eql({ foo: 'foo', bar: 'bar' })
    })

    it('returns undefined for unmatched optional named params', () => {
      const result = matchPattern('/:foo/:bar?', '/foo')
      expect(result.params).to.eql({ foo: 'foo', bar: undefined })
    })

    it('returns pathname', () => {
      const result = matchPattern('/:foo/:bar', '/foo/bar')
      expect(result.path).to.eql('/foo/bar')
    })

    it('matches pattern exactly by default', () => {
      const result = matchPattern('/foo', '/foo/')
      expect(result).to.equal(null)
    })

    it('optionally matches pattern loosely', () => {
      const result = matchPattern('/foo', '/foo/bar', { exact: false })
      expect(result).to.not.equal(null)
    })

    it('optionally matches pattern non strict', () => {
      const result = matchPattern('/foo', '/foo/', { strict: false })
      expect(result).to.not.equal(null)
    })
  })
})
