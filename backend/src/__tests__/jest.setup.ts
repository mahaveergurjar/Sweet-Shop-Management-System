// This file runs before jest-environment-node initializes
// Prevents localStorage SecurityError

// Patch localStorage before jest-environment-node tries to access it
const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Define localStorage on global before environment initialization
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
});

// Also patch it on the process object if needed
if (typeof process !== 'undefined') {
  (process as any).localStorage = localStorageMock;
}
