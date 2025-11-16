import pool from '../config/database';
import testPool from '../config/testDatabase';

// Clean up database before and after tests
export const setupTestDB = async () => {
  // Use test database for tests
  await testPool.query('TRUNCATE TABLE sweets, users RESTART IDENTITY CASCADE');
};

export const teardownTestDB = async () => {
  await testPool.query('TRUNCATE TABLE sweets, users RESTART IDENTITY CASCADE');
  await testPool.end();
};

