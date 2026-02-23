const globalRef = typeof globalThis === 'object' && globalThis ? globalThis : {};

const isNode =
  !!(
    globalRef.process &&
    globalRef.process.versions &&
    typeof globalRef.process.versions.node === 'string'
  );

const hasWindow = !!globalRef.window;
const hasDocument = !!globalRef.document;
const hasWorkerScope =
  typeof globalRef.WorkerGlobalScope === 'function' &&
  globalRef instanceof globalRef.WorkerGlobalScope;
const hasWorkerGlobalMarkers =
  !!globalRef.self &&
  typeof globalRef.importScripts === 'function' &&
  !hasWindow;

const isWorker = !isNode && (hasWorkerScope || hasWorkerGlobalMarkers);
const isBrowser = !isNode && !isWorker && hasWindow && hasDocument;

let runtime = 'unknown';
if (isNode) runtime = 'node';
else if (isWorker) runtime = 'worker';
else if (isBrowser) runtime = 'browser';

export { isNode, isBrowser, isWorker, runtime };

export default {
  isNode,
  isBrowser,
  isWorker,
  runtime
};
