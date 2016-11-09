import { expect } from 'chai'
import { pop, push, replace } from '../actions'
import { POP, PUSH, REPLACE, LOCATION_CHANGE } from '../const'

describe('actions', () => {
  describe('pop', () => {
    it('contains a type', () => {
      expect(pop('/').type).to.equal(LOCATION_CHANGE)
    })

    it('contains a method', () => {
      expect(pop('/').method).to.equal(POP)
    })

    it('contains a parsed location', () => {
      expect(pop('/').location).to.be.an('object')
    })
  })

  describe('push', () => {
    it('contains a type', () => {
      expect(push('/').type).to.equal(LOCATION_CHANGE)
    })

    it('contains a method', () => {
      expect(push('/').method).to.equal(PUSH)
    })

    it('contains a parsed location', () => {
      expect(push('/').location).to.be.an('object')
    })
  })

  describe('replace', () => {
    it('contains a type', () => {
      expect(replace('/').type).to.equal(LOCATION_CHANGE)
    })

    it('contains a method', () => {
      expect(replace('/').method).to.equal(REPLACE)
    })

    it('contains a parsed location', () => {
      expect(replace('/').location).to.be.an('object')
    })
  })
})
