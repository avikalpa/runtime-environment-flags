"use strict";

var globalRef = typeof globalThis === "object" && globalThis ? globalThis : {};

var isNode =
    !!(
        globalRef.process &&
        globalRef.process.versions &&
        typeof globalRef.process.versions.node === "string"
    );

var hasWindow = !!globalRef.window;
var hasDocument = !!globalRef.document;
var hasWorkerScope =
    typeof globalRef.WorkerGlobalScope === "function" &&
    globalRef instanceof globalRef.WorkerGlobalScope;
var hasWorkerGlobalMarkers =
    !!globalRef.self &&
    typeof globalRef.importScripts === "function" &&
    !hasWindow;

var isWorker = !isNode && (hasWorkerScope || hasWorkerGlobalMarkers);
var isBrowser = !isNode && !isWorker && hasWindow && hasDocument;

var runtime = "unknown";
if (isNode) runtime = "node";
else if (isWorker) runtime = "worker";
else if (isBrowser) runtime = "browser";

module.exports = {
    isNode: isNode,
    isBrowser: isBrowser,
    isWorker: isWorker,
    runtime: runtime
};
