import {SwiftCache} from '../lib/SwiftCache'
import {expect} from 'chai'
import sinon, {SinonFakeTimers} from 'sinon'

describe('SwiftCache', function() {
  const swiftCache = new SwiftCache()
  let clock: SinonFakeTimers

  before(() => {
    clock = sinon.useFakeTimers()
  })

  beforeEach(() => {
    swiftCache.flush()
  })

  after(() => {
    clock.restore()
    swiftCache.end()
  })

  it('should set store a number', async () => {
    expect(swiftCache.set('aKey', 0)).to.equal(0)
  })

  it('should set store a string', async () => {

    expect(swiftCache.set('aKey', 'aValue')).to.equal('aValue')
  })

  it('should set store an array', async () => {

    expect(swiftCache.set('aKey', ['aValue'])).to.deep.equal(['aValue'])
  })

  it('should set store an object', async () => {

    expect(swiftCache.set('aKey', {k: 'aValue'})).to.deep.equal({
      k: 'aValue',
    })
  })

  it('should get the number entry', async () => {
    swiftCache.set('aKey', 0)

    expect(swiftCache.get('aKey')).to.equal(0)
  })

  it('should get the string entry', async () => {
    swiftCache.set('aKey', 'aValue')

    expect(swiftCache.get('aKey')).to.equal('aValue')
  })

  it('should get the array entry', async () => {
    swiftCache.set('aKey', ['aValue'])

    expect(swiftCache.get('aKey')).to.deep.equal(['aValue'])
  })

  it('should get the object entry', async () => {
    swiftCache.set('aKey', {k: 'aValue'})

    expect(swiftCache.get('aKey')).to.deep.equal({k: 'aValue'})
  })

  it('should get the date entry', async () => {
    const aDate = new Date();
    swiftCache.set('aKey', aDate)

    expect(swiftCache.set('aKey', aDate)).to.deep.equal(aDate)
  })

  it('should get the mulitple entries', async () => {
    swiftCache.set('aKey', {k: 'aValue'})
    swiftCache.set('anotherKey', 'anotherValue')

    expect(
      swiftCache.mget(['aKey', 'anotherKey', 'unexistingKey'])
    ).to.deep.equal([{k: 'aValue'}, 'anotherValue', undefined])
  })

  it('should get undefined for unexisting key', async () => {
    expect(swiftCache.get('aKey')).to.be.undefined
  })

  it('should expire an entry when ttl is over', async () => {
    swiftCache.set('aKey', 'aValue', 2)
    // move 2 sec forward
    clock.tick(2000)

    expect(swiftCache.get('aKey')).to.be.undefined
  })

  it('should preserve the stored value', async () => {
    let aVar = 'aValue'
    swiftCache.set('aKey', aVar)
    aVar = 'anotherValue'

    expect(swiftCache.get('aKey')).to.equal('aValue')
  })

  it('should list the stored keys', async () => {
    swiftCache.set('aKey', 'aValue')
    swiftCache.set('anotherKey', 'anotherValue')

    expect(swiftCache.keys()).to.deep.equal(['aKey', 'anotherKey'])
  })

  it('should delete an entry', async () => {
    swiftCache.set('aKey', 'aValue')

    expect(swiftCache.del('aKey')).to.be.true
    expect(swiftCache.get('aKey')).to.be.undefined
  })

  it('should flush all entries', async () => {
    swiftCache.set('aKey', 'aValue')
    swiftCache.set('anotherKey', 'anotherValue')

    swiftCache.flush()

    expect(swiftCache.keys()).to.be.empty
  })
})
