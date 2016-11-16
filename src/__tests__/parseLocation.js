import { expect } from 'chai'
import parse from '../parseLocation'

describe('parseLocation', () => {
  describe('when given a string', () => {
    it('returns a pathname, href, search path, hash, and query params', () => {
      const location = parse('/listings?type=active#foo')
      expect(location.href).to.eql('/listings?type=active#foo')
      expect(location.pathname).to.eql('/listings')
      expect(location.search).to.eql('?type=active')
      expect(location.query).to.eql({ type: 'active' })
      expect(location.hash).to.eql('#foo')
    })

    it('returns an empty string for unmatched pathname', () => {
      const location = parse('')
      expect(location.pathname).to.eql('')
    })

    it('returns an empty string for unmatched search path', () => {
      const location = parse('/listings')
      expect(location.search).to.eql('')
    })

    it('returns an empty object for unmatched queries', () => {
      const location = parse('/listings')
      expect(location.query).to.eql({})
    })
  })

  describe('when given an object', () => {
    it('populates query when given a search path', () => {
      const location = parse({ query: { type: 'active' } })
      expect(location.search).to.eql('?type=active')
    })

    it('populates search path when given a query', () => {
      const location = parse({ search: '?type=active' })
      expect(location.query).to.eql({ type: 'active' })
    })
  })
})
