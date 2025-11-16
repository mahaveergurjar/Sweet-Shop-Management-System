import 'dotenv/config';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret';

import testPool from '../config/testDatabase';

// Clean up database before and after tests
export const setupTestDB = async () => {
  // Use test database for tests
  try {
    await testPool.query('TRUNCATE TABLE sweets, users RESTART IDENTITY CASCADE');
  } catch (error) {
    // Tables might not exist yet, that's okay for tests
    console.warn('Could not truncate tables (they may not exist yet):', error);
  }
};

export const teardownTestDB = async () => {
  try {
    await testPool.query('TRUNCATE TABLE sweets, users RESTART IDENTITY CASCADE');
  } catch (error) {
    // Ignore errors during teardown
  }
  await testPool.end();
};

