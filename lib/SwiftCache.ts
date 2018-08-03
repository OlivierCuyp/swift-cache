import msgpack from 'msgpack-lite'

interface IOptions {
  cleanInterval?: number
}

interface Dictionnary<T> {
  [key: string]: T
}

interface Entry {
  value: Buffer
  expire: number
}

export default class SwiftCache {
  private data: Dictionnary<Entry>
  private cleanInterval: number

  constructor(options: IOptions = {}) {
    this.data = {}
    this.cleanInterval = options.cleanInterval || 60

    setInterval(() => {
      // Clean expired entries
      for (const key in this.data) {
        if (this.data[key].expire < Date.now()) {
          this.del(key)
        }
      }
    }, this.cleanInterval * 1000)
  }

  set<T>(key: string, value: T, ttl?: number): T {
    const expire = ttl ? Date.now() + ttl * 1000 : Infinity
    this.data[key] = {
      value: msgpack.encode(value),
      expire,
    }
    return value
  }

  get<T>(key: string): T | undefined {
    if (this.data[key] && this.data[key].expire > Date.now()) {
      return msgpack.decode(this.data[key].value)
    }
    return undefined
  }

  mget<T>(keys: string[]): (T | undefined)[] {
    return keys.map((key: string) => this.get(key))
  }

  del(key: string): boolean {
    if (this.data[key]) {
      delete this.data[key]
      return true
    }
    return false
  }

  keys(): string[] {
    return Object.keys(this.data)
  }

  flush(): void {
    const keys = this.keys()
    for (const key of keys) {
      this.del(key)
    }
  }
}
