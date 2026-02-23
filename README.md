# @avikalpa/environment

Tiny runtime flags for JavaScript environments.

- `isNode`: `true` when running in Node.js.
- `isBrowser`: `true` when browser globals (`window` and `document`) exist and Node.js is not detected.

## Install

```bash
npm i @avikalpa/environment
```

## Usage

```js
const Environment = require('@avikalpa/environment');

if (Environment.isBrowser) {
  requestAnimationFrame(() => {
    // browser-only code
  });
}

if (Environment.isNode) {
  // node-only code
  const buf = Buffer.from('ok');
  console.log(buf.toString());
}
```

## Test

```bash
bun test
```

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).

## License

MIT - see [`LICENSE`](./LICENSE).
