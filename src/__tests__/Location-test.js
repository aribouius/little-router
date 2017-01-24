import { expect } from 'chai'
import Location from '../Location'

describe('Location', () => {
  const url = '/foo?bar=bar#baz'

  it('returns constructor argument when given instance of Location class', () => {
    const loc = new Location(url)
    expect(new Location(loc)).to.equal(loc)
  })

  it('parses a pathname', () => {
    const loc = new Location(url)
    expect(loc.pathname).to.equal('/foo')
  })

  it('parses a query object', () => {
    const loc = new Location(url)
    expect(loc.query).to.eql({ bar: 'bar' })
  })

  it('parses a query string', () => {
    const loc = new Location(url)
    expect(loc.search).to.equal('?bar=bar')
  })

  it('parses a hash', () => {
    const loc = new Location(url)
    expect(loc.hash).to.equal('#baz')
  })

  it('parses a href', () => {
    const loc = new Location(url)
    expect(loc.href).to.equal(url)
  })

  it('parses a query string when given a query object', () => {
    const loc = new Location({ query: { foo: 'foo' } })
    expect(loc.search).to.eql('?foo=foo')
  })

  it('parses a query object when given a query string', () => {
    const loc = new Location({ search: '?foo=foo' })
    expect(loc.query).to.eql({ foo: 'foo' })
  })

  it('always return a query object', () => {
    expect(new Location('/foo').query).to.eql({})
  })

  it('is indifferent to trailing slashes', () => {
    expect(new Location('/foo').pathname).to.equal('/foo')
    expect(new Location('/foo/').pathname).to.equal('/foo/')
  })
})
