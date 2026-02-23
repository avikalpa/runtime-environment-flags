# Changelog

## 1.3.0 - 2026-02-23

- Added `isWorker` flag.
- Added `runtime` string (`node`, `browser`, `worker`, `unknown`).
- Added dual package outputs (CommonJS + ESM) via `exports` map.
- Added broader edge-case tests.
- Added CI workflow for Node (18, 20, 22) and Bun.
- Added `engines` and `sideEffects` metadata.
- Added `CONTRIBUTING.md` and `SECURITY.md`.

## 1.2.0 - 2026-02-23

- Reworked runtime detection to remove dynamic `new Function(...)` checks.
- Added automated tests for Node, browser-like, and unknown contexts.
- Added npm provenance support and GitHub Actions publish workflow.
- Recovered and refreshed project metadata after repository restoration.

## 1.1.1

- Returned two flags instead of function objects.
- Added typings.
- Minor README corrections.
