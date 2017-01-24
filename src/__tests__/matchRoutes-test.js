import { expect } from 'chai'
import match from '../matchRoutes'

describe('matchRoutes', () => {
  it('returns an array', () => {
    const result = match('/', [])
    expect(result).to.eql([])
  })

  it('returns matched routes', () => {
    const routes = [{ path: '/foo', name: 'foo' }]
    const result = match('/foo', routes)
    expect(result).to.eql([{ name: 'foo', params: {} }])
  })

  it('stops matching after the first exact match', () => {
    const routes = [
      { path: '/foo', name: 'foo' },
      { path: '/foo', name: 'bar' },
    ]
    const result = match('/foo', routes)
    expect(result).to.eql([{ name: 'foo', params: {} }])
  })

  it('matches nested routes', () => {
    const routes = [{
      path: '/foo',
      name: 'foo',
      routes: [{
        path: '/bar',
        name: 'bar',
      }],
    }]
    const result = match('/foo/bar', routes)
    expect(result).to.eql([
      { name: 'foo', params: {} },
      { name: 'bar', params: {} },
    ])
  })

  it('handles nested index routes', () => {
    const routes = [{
      name: 'foo',
      path: '/',
      routes: [{
        path: '/',
        name: 'bar',
      }],
    }]
    const result = match('/', routes)
    expect(result).to.eql([
      { name: 'foo', params: {} },
      { name: 'bar', params: {} },
    ])
  })

  it('does not require a path for parent or index routes', () => {
    const routes = [{
      name: 'foo',
      routes: [{
        path: '/bar',
        name: 'bar',
        routes: [{
          name: 'baz',
        }],
      }],
    }]
    const result = match('/bar', routes)
    expect(result).to.eql([
      { name: 'foo', params: {} },
      { name: 'bar', params: {} },
      { name: 'baz', params: {} },
    ])
  })

  it('appends params to routes', () => {
    const routes = [{
      path: '/:foo',
      routes: [{
        path: '/:bar',
        routes: [{
          path: '/:baz',
        }],
      }],
    }]
    const result = match('/foo/bar/baz', routes)
    expect(result).to.eql([
      { params: { foo: 'foo' } },
      { params: { foo: 'foo', bar: 'bar' } },
      { params: { foo: 'foo', bar: 'bar', baz: 'baz' } },
    ])
  })
})
