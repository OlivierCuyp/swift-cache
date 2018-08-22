# Swift Cache [![Coverage Status](https://coveralls.io/repos/github/OlivierCuyp/swift-cache/badge.svg?branch=master)](https://coveralls.io/github/OlivierCuyp/swift-cache?branch=master) [![CircleCI](https://circleci.com/gh/OlivierCuyp/swift-cache.svg?style=svg)](https://circleci.com/gh/OlivierCuyp/swift-cache)

Cache based on the fast [msgpack](https://msgpack.org) serialization

A simple & really swift caching package inspired from Redis basic commands.
There is only 7 methods: `set`, `get`, `mget`, `keys`, `del`, `flush` and `end`.
Each entry has an optional **ttl**.
All expired entries are cleaned on periodic garbage collection.

## Installation

```sh
$ npm install swift-cache
```

## Usage

```js
// require SwitchCache
const SwiftCache = require('swift-cache').SwiftCache
// import SwitchCache
import {SwiftCache} from 'swift-cache'
// create the cache with a cleaning interval of the expired keys set to 120 sec (default: 60 sec)
const cache = new SwiftCache({cleanInterval: 120})
// this will cache the value with a ttl of 60 sec (ttl is optional)
cache.set('key', 'value', 60)
// this will retrieve the value if not expired, otherwsise will return undefined
const cachedValue = cache.get('key')
// this will retrieve multiple values, array value will be undefined if key doesn't exists
const cachedValues = cache.mget(['key1', 'key2', 'key3'])
// this will retrieve all cached keys
const keys = cache.keys()
// this will delete the entry from the cache and return true if the key existed
cache.del('key')
// this will delete all the entries from the cache
cache.flush()
// this will delete the clean timer. It should be called when cache is not needed anymore
cache.end()
```

## Npm scripts

### Running the tests

```sh
$ npm test
```

### Running the lint check

```sh
$ npm test:lint
```

### Running the type check

```sh
$ npm test:type
```

### Running the type cover

```sh
$ npm test:cover
```

## Reporting bugs and contributing

If you want to report a bug or request a feature, please open an issue.
If want to help us improve swift-cache, fork and make a pull request. But before drop an eye on [emoji commit](https://github.com/slashsBin/styleguide-git-commit-message).

## Repository

- [https://github.com/oliviercuyp/swift-cache](https://github.com/oliviercuyp/swift-cache)

## See Also

- [http://msgpack.org/](http://msgpack.org/)

## License

The MIT License (MIT)

Copyright (c) 2018 Olivier Cuypers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
