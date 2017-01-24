import { expect } from 'chai'
import reducer, { initial } from '../reducer'
import { LOCATION_CHANGE } from '../const'

describe('reducer', () => {
  it(`updates the location state on ${LOCATION_CHANGE} actions`, () => {
    const location = {
      href: '/foo/bar?foo=bar#foo',
      hash: '#foo',
      search: '?foo=bar',
      pathname: '/foo/bar',
      query: { foo: 'bar' },
    }

    const state = reducer(initial, { type: LOCATION_CHANGE, location })
    expect(state).to.eql(location)
  })

  it('does nothing for other actions', () => {
    const state = reducer(initial, { type: 'foo' })
    expect(state).to.equal(initial)
  })
})