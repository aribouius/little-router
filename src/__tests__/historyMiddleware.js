import { expect } from 'chai'
import sinon from 'sinon'
import { jsdom } from 'jsdom'
import { createStore, applyMiddleware } from 'redux'
import { push, replace } from '../actions'
import { PUSH, REPLACE, LOCATION_CHANGE } from '../const'
import historyMiddleware from '../historyMiddleware'

describe('historyMiddleware', () => {
  let history
  let globals

  const getStore = (reducer = () => {}) => {
    history = { pushState: sinon.spy(), replaceState: sinon.spy() }
    return createStore(reducer, {}, applyMiddleware(historyMiddleware(history)))
  }

  beforeEach(() => {
    const doc = jsdom('<!doctype html><html><body></body></html>')
    const win = doc.defaultView
    globals = { document: doc, window: win, navigator: win.navigator }
    Object.assign(global, globals)
  })

  afterEach(() => {
    Object.keys(globals).forEach(key => delete global[key])
    globals = undefined
  })

  it(`dispatches ${LOCATION_CHANGE} action on popstate events`, () => {
    const spy = sinon.spy()
    const reducer = (state, action) => {
      if (action.type === LOCATION_CHANGE) {
        spy(action)
      }
    }

    getStore(reducer)
    window.dispatchEvent(new window.Event('popstate'))
    expect(spy.called).to.equal(true)
  })

  it(`calls history.pushState on when location change action method equals ${PUSH}`, () => {
    getStore().dispatch(push('/foo'))
    expect(history.pushState.called).to.equal(true)
  })

  it(`calls history.replaceState when location change action method equals ${REPLACE}`, () => {
    getStore().dispatch(replace('/foo'))
    expect(history.replaceState.called).to.equal(true)
  })
})
