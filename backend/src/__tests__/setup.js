import "dotenv/config";
import { resetPrismaMock } from "../context.js";

// Set test environment variables
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";

beforeEach(() => {
  resetPrismaMock();
});

// Clean up database before and after tests
export const setupTestDB = async () => {
  // Not needed when using mockDeep from jest-mock-extended
};

export const teardownTestDB = async () => {
  // Not needed when using mockDeep from jest-mock-extended
};
