import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Support both connection string (Aiven format) and individual parameters
let poolConfig: any;

if (process.env.DATABASE_URL) {
  // Use connection string (Aiven provides this format)
  // Parse connection string to check if SSL is required
  const connectionString = process.env.DATABASE_URL;
  const requiresSSL = connectionString.includes('sslmode=require') || 
                      connectionString.includes('aivencloud.com') ||
                      connectionString.includes('aiven.io');
  
  poolConfig = {
    connectionString: connectionString,
    // Aiven always requires SSL
    ssl: requiresSSL ? { rejectUnauthorized: false } : false,
  };
} else {
  // Use individual parameters
  // Check if it's Aiven (host contains aivencloud.com or aiven.io)
  const isAiven = (process.env.DB_HOST || '').includes('aivencloud.com') || 
                  (process.env.DB_HOST || '').includes('aiven.io');
  
  poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'sweet_shop',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    // Aiven always requires SSL, or if DB_SSL is explicitly set to true
    ssl: isAiven || process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  };
}

const pool = new Pool(poolConfig);

// Test database connection on startup
pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  // Don't exit in production, just log the error
  if (process.env.NODE_ENV !== 'production') {
    process.exit(-1);
  }
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection test failed:', err.message);
    console.error('Please check:');
    console.error('  - Database is running');
    console.error('  - Environment variables are set correctly');
    console.error('  - Database name exists');
    
    // Check for SSL/encryption errors
    if (err.message.includes('no encryption') || err.message.includes('SSL')) {
      console.error('');
      console.error('🔒 SSL/Encryption Error Detected!');
      console.error('Aiven requires SSL connections. Solutions:');
      console.error('');
      console.error('Option 1: Use DATABASE_URL with sslmode=require');
      console.error('  DATABASE_URL=postgresql://user:pass@host:port/db?sslmode=require');
      console.error('');
      console.error('Option 2: If using individual parameters, add:');
      console.error('  DB_SSL=true');
      console.error('  (SSL will be auto-enabled if host contains "aivencloud.com")');
      console.error('');
    }
    
    if (process.env.DATABASE_URL) {
      console.error('  - Aiven: Check your connection string format');
      console.error('  - Aiven: Make sure SSL is enabled (sslmode=require)');
    } else {
      const host = process.env.DB_HOST || '';
      if (host.includes('aivencloud.com') || host.includes('aiven.io')) {
        console.error('  - Aiven detected: SSL should be auto-enabled');
        console.error('  - If still failing, try using DATABASE_URL instead');
      }
    }
  } else {
    console.log('✅ Database connection test passed');
    if (process.env.DATABASE_URL || (process.env.DB_HOST || '').includes('aiven')) {
      console.log('✅ Connected to Aiven PostgreSQL with SSL');
    }
  }
});

export default pool;
