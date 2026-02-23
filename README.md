# @avikalpa/environment

Tiny runtime flags for JavaScript environments.

- `isNode`: `true` in Node.js.
- `isBrowser`: `true` in browser main thread.
- `isWorker`: `true` in web worker/service worker-like runtimes.
- `runtime`: `'node' | 'browser' | 'worker' | 'unknown'`.

## Install

```bash
npm i @avikalpa/environment
```

## Usage

```js
const Environment = require('@avikalpa/environment');

if (Environment.isBrowser) {
  // browser-only code
}

if (Environment.isNode) {
  // node-only code
}

console.log(Environment.runtime);
```

## Runtime Table

| Environment | isNode | isBrowser | isWorker | runtime |
| --- | --- | --- | --- | --- |
| Node.js | true | false | false | `node` |
| Browser main thread | false | true | false | `browser` |
| Worker | false | false | true | `worker` |
| Unknown/other | false | false | false | `unknown` |

## Test

```bash
bun test
```

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Security

See [`SECURITY.md`](./SECURITY.md).

## License

MIT - see [`LICENSE`](./LICENSE).
