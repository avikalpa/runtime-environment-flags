import { describe, expect, test } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const cjsPkg = require('../index.js');

const source = fs.readFileSync(path.join(import.meta.dir, '..', 'index.js'), 'utf8');

type EnvFlags = {
  isNode: boolean;
  isBrowser: boolean;
  isWorker: boolean;
  runtime: 'node' | 'browser' | 'worker' | 'unknown';
};

function runInContext(context: Record<string, unknown>): EnvFlags {
  vm.runInNewContext(source, context);
  return (context.module as { exports: EnvFlags }).exports;
}

describe('commonjs export', () => {
  test('detects current Node runtime', () => {
    expect(cjsPkg.isNode).toBe(true);
    expect(cjsPkg.isBrowser).toBe(false);
    expect(cjsPkg.isWorker).toBe(false);
    expect(cjsPkg.runtime).toBe('node');
  });

  test('detects browser-like runtime in an isolated context', () => {
    const context: Record<string, unknown> = {
      module: { exports: {} },
      exports: {}
    };

    context.window = context;
    context.document = {};

    const exported = runInContext(context);
    expect(exported.isBrowser).toBe(true);
    expect(exported.isNode).toBe(false);
    expect(exported.isWorker).toBe(false);
    expect(exported.runtime).toBe('browser');
  });

  test('detects worker-like runtime from importScripts marker', () => {
    const context: Record<string, unknown> = {
      module: { exports: {} },
      exports: {},
      self: {},
      importScripts: () => undefined
    };

    const exported = runInContext(context);
    expect(exported.isBrowser).toBe(false);
    expect(exported.isNode).toBe(false);
    expect(exported.isWorker).toBe(true);
    expect(exported.runtime).toBe('worker');
  });

  test('prefers Node detection when browser globals are shimmed', () => {
    const context: Record<string, unknown> = {
      module: { exports: {} },
      exports: {},
      process: { versions: { node: '20.0.0' } }
    };

    context.window = context;
    context.document = {};

    const exported = runInContext(context);
    expect(exported.isNode).toBe(true);
    expect(exported.isBrowser).toBe(false);
    expect(exported.isWorker).toBe(false);
    expect(exported.runtime).toBe('node');
  });

  test('returns unknown when no runtime markers exist', () => {
    const context: Record<string, unknown> = {
      module: { exports: {} },
      exports: {}
    };

    const exported = runInContext(context);
    expect(exported.isBrowser).toBe(false);
    expect(exported.isNode).toBe(false);
    expect(exported.isWorker).toBe(false);
    expect(exported.runtime).toBe('unknown');
  });
});

describe('esm export', () => {
  test('matches CJS flags and runtime', async () => {
    const esmPkg = await import('../index.mjs');

    expect(esmPkg.isNode).toBe(cjsPkg.isNode);
    expect(esmPkg.isBrowser).toBe(cjsPkg.isBrowser);
    expect(esmPkg.isWorker).toBe(cjsPkg.isWorker);
    expect(esmPkg.runtime).toBe(cjsPkg.runtime);

    expect(esmPkg.default.isNode).toBe(cjsPkg.isNode);
    expect(esmPkg.default.isBrowser).toBe(cjsPkg.isBrowser);
    expect(esmPkg.default.isWorker).toBe(cjsPkg.isWorker);
    expect(esmPkg.default.runtime).toBe(cjsPkg.runtime);
  });
});
