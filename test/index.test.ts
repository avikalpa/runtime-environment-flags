import { describe, expect, test } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const pkg = require('../index.js');

describe('environment flags', () => {
  test('detects current Node runtime', () => {
    expect(pkg.isNode).toBe(true);
    expect(pkg.isBrowser).toBe(false);
  });

  test('detects browser-like runtime in an isolated context', () => {
    const source = fs.readFileSync(path.join(import.meta.dir, '..', 'index.js'), 'utf8');
    const context: Record<string, unknown> = {
      module: { exports: {} },
      exports: {}
    };

    context.window = context;
    context.document = {};

    vm.runInNewContext(source, context);

    const exported = (context.module as { exports: { isNode: boolean; isBrowser: boolean } }).exports;
    expect(exported.isBrowser).toBe(true);
    expect(exported.isNode).toBe(false);
  });

  test('returns false for both flags in unknown context', () => {
    const source = fs.readFileSync(path.join(import.meta.dir, '..', 'index.js'), 'utf8');
    const context: Record<string, unknown> = {
      module: { exports: {} },
      exports: {}
    };

    vm.runInNewContext(source, context);

    const exported = (context.module as { exports: { isNode: boolean; isBrowser: boolean } }).exports;
    expect(exported.isBrowser).toBe(false);
    expect(exported.isNode).toBe(false);
  });
});
