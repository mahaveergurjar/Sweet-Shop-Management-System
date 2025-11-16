// Custom test environment that fixes localStorage issue
// Patch globalThis.localStorage before requiring jest-environment-node
const localStorageMock = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};

// Set localStorage on globalThis before NodeEnvironment tries to access it
if (typeof globalThis !== 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
    configurable: true,
  });
}

const NodeEnvironment = require('jest-environment-node').default || require('jest-environment-node');

class CustomTestEnvironment extends NodeEnvironment {
  constructor(config, context) {
    // Ensure localStorage is set before calling super
    if (typeof globalThis !== 'undefined' && !globalThis.localStorage) {
      Object.defineProperty(globalThis, 'localStorage', {
        value: localStorageMock,
        writable: true,
        configurable: true,
      });
    }
    super(config, context);
  }

  async setup() {
    await super.setup();
    // Ensure localStorage is available in test context
    this.global.localStorage = localStorageMock;
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = CustomTestEnvironment;

