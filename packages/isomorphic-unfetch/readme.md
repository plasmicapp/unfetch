# Isomorphic Unfetch

Switches between [unfetch](https://github.com/developit/unfetch) & [node-fetch](https://github.com/bitinn/node-fetch) for client & server.

Fork differences:
1. On Node, `node-fetch` is always used instead of `global.fetch`.
This is a workaround this [`undici` bug](https://github.com/nodejs/undici/issues/1776)
which is negatively affecting many versions of Node and Next.js.
2. Don't polyfill, leave `global.fetch` alone.
3. Applies a patch on node-fetch-cjs to [this node-fetch bug](https://github.com/node-fetch/node-fetch/issues/1576) by following [this PR](https://github.com/Treverix/node-fetch/commit/625fd385b3a72348266ed3849c8a88391059e9dd?diff=split).  Then we inline node-fetch-cjs into the built version of server.js, so that it will contain our patched version of node-fetch-cjs.

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm i isomorphic-unfetch
```

Then with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```javascript
// using ES6 modules
import fetch from 'isomorphic-unfetch'

// using CommonJS modules
const fetch = require('isomorphic-unfetch')
```

## Usage

As a [**ponyfill**](https://ponyfill.com):

```js
import fetch from 'isomorphic-unfetch';

fetch('/foo.json')
  .then( r => r.json() )
  .then( data => {
    console.log(data);
  });
```

Globally, as a [**polyfill**](https://ponyfill.com/#polyfill):

```js
import 'isomorphic-unfetch';

// "fetch" is now installed globally if it wasn't already available

fetch('/foo.json')
  .then( r => r.json() )
  .then( data => {
    console.log(data);
  });
```

## License

[MIT License](LICENSE.md) © [Jason Miller](https://jasonformat.com/)
