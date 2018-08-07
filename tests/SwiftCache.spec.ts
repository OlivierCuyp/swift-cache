import {SwiftCache} from '../lib/SwiftCache'
import {expect} from 'chai'
import sinon, {SinonFakeTimers} from 'sinon'

describe('SwiftCache', function() {
  let clock: SinonFakeTimers

  before(function() {
    clock = sinon.useFakeTimers()
  })

  after(function() {
    clock.restore()
  })

  it('should set store a number', async () => {
    const swiftCache = new SwiftCache()

    expect(swiftCache.set('aKey', 0)).to.equal(0)
  })

  it('should set store a string', async () => {
    const swiftCache = new SwiftCache()

    expect(swiftCache.set('aKey', 'aValue')).to.equal('aValue')
  })

  it('should set store an array', async () => {
    const swiftCache = new SwiftCache()

    expect(swiftCache.set('aKey', ['aValue'])).to.deep.equal(['aValue'])
  })

  it('should set store an object', async () => {
    const swiftCache = new SwiftCache()

    expect(swiftCache.set('aKey', {k: 'aValue'})).to.deep.equal({
      k: 'aValue',
    })
  })

  it('should get the number entry', async () => {
    const swiftCache = new SwiftCache()
    swiftCache.set('aKey', 0)

    expect(swiftCache.get('aKey')).to.equal(0)
  })

  it('should get the string entry', async () => {
    const swiftCache = new SwiftCache()
    swiftCache.set('aKey', 'aValue')

    expect(swiftCache.get('aKey')).to.equal('aValue')
  })

  it('should get the array entry', async () => {
    const swiftCache = new SwiftCache()
    swiftCache.set('aKey', ['aValue'])

    expect(swiftCache.get('aKey')).to.deep.equal(['aValue'])
  })

  it('should get the object entry', async () => {
    const swiftCache = new SwiftCache()
    swiftCache.set('aKey', {k: 'aValue'})

    expect(swiftCache.get('aKey')).to.deep.equal({k: 'aValue'})
  })

  it('should get the mulitple entries', async () => {
    const swiftCache = new SwiftCache()
    swiftCache.set('aKey', {k: 'aValue'})
    swiftCache.set('anotherKey', 'anotherValue')

    expect(
      swiftCache.mget(['aKey', 'anotherKey', 'unexistingKey'])
    ).to.deep.equal([{k: 'aValue'}, 'anotherValue', undefined])
  })

  it('should get undefined for unexisting key', async () => {
    const swiftCache = new SwiftCache()

    expect(swiftCache.get('aKey')).to.be.undefined
  })

  it('should expire an entry when ttl is over', async () => {
    const swiftCache = new SwiftCache()

    swiftCache.set('aKey', 'aValue', 2)
    // move 2 sec forward
    clock.tick(2000)

    expect(swiftCache.get('aKey')).to.be.undefined
  })

  it('should preserve the stored value', async () => {
    const swiftCache = new SwiftCache()
    let aVar = 'aValue'
    swiftCache.set('aKey', aVar)
    aVar = 'anotherValue'

    expect(swiftCache.get('aKey')).to.equal('aValue')
  })

  it('should list the stored keys', async () => {
    const swiftCache = new SwiftCache()
    swiftCache.set('aKey', 'aValue')
    swiftCache.set('anotherKey', 'anotherValue')

    expect(swiftCache.keys()).to.deep.equal(['aKey', 'anotherKey'])
  })

  it('should delete an entry', async () => {
    const swiftCache = new SwiftCache()
    swiftCache.set('aKey', 'aValue')

    expect(swiftCache.del('aKey')).to.be.true
    expect(swiftCache.get('aKey')).to.be.undefined
  })

  it('should flush all entries', async () => {
    const swiftCache = new SwiftCache()
    swiftCache.set('aKey', 'aValue')
    swiftCache.set('anotherKey', 'anotherValue')

    swiftCache.flush()

    expect(swiftCache.keys()).to.be.empty
  })
})
