export type RuntimeEnvironment = 'node' | 'browser' | 'worker' | 'unknown';

declare const environment: {
  isNode: boolean;
  isBrowser: boolean;
  isWorker: boolean;
  runtime: RuntimeEnvironment;
};

export = environment;
