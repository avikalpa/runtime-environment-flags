export type RuntimeEnvironment = 'node' | 'browser' | 'worker' | 'unknown';

export declare const isNode: boolean;
export declare const isBrowser: boolean;
export declare const isWorker: boolean;
export declare const runtime: RuntimeEnvironment;

declare const _default: {
  isNode: boolean;
  isBrowser: boolean;
  isWorker: boolean;
  runtime: RuntimeEnvironment;
};

export default _default;
