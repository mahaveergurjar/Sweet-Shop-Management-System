module.exports = {
  preset: "ts-jest",
  testEnvironment: "<rootDir>/src/__tests__/custom-test-environment.js",
  setupFiles: ["<rootDir>/src/__tests__/jest.setup.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts", "!src/index.ts", "!src/__tests__/**"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      tsconfig: {
        esModuleInterop: true,
        skipLibCheck: true,
      },
    }],
  },
};
