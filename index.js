"use strict";

var globalRef = typeof globalThis === "object" && globalThis ? globalThis : {};

var isNode =
    !!(
        globalRef.process &&
        globalRef.process.versions &&
        typeof globalRef.process.versions.node === "string"
    );

var isBrowser =
    !!(
        !isNode &&
        globalRef.window &&
        globalRef.document
    );

module.exports = {
    isNode: isNode,
    isBrowser: isBrowser
};
