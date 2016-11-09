import { expect } from 'chai'
import match from '../matchLocation'

describe('matchLocation', () => {
  it('always returns an array', () => {
    const result = match({ pathname: '/' }, [])
    expect(result).to.be.an('array')
  })

  it('returns an array of matched routes', () => {
    const routes = [{ path: '/foo' }]
    const result = match({ pathname: '/foo' }, routes)
    expect(result).to.eql([{ pathname: '/foo', params: {} }])
  })

  it('stops matching after the first exact match', () => {
    const routes = [{ path: '/foo', name: 'foo' }, { path: '/foo', name: 'bar' }]
    const result = match({ pathname: '/foo' }, routes)
    expect(result).to.eql([{ pathname: '/foo', params: {}, name: 'foo' }])
  })

  it('matches nested routes', () => {
    const routes = [{ path: '/foo', routes: [{ path: '/bar' }] }]
    const result = match({ pathname: '/foo/bar' }, routes)
    expect(result).to.eql([
      { pathname: '/foo', params: {} },
      { pathname: '/foo/bar', params: {} },
    ])
  })
})
