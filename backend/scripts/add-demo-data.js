const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'sweet_shop',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

const demoData = [
  ['Chocolate Bar', 'Chocolate', 25.00, 100],
  ['Gummy Bears', 'Candy', 18.00, 150],
  ['Lollipop', 'Candy', 8.00, 200],
  ['Caramel Toffee', 'Toffee', 22.00, 80],
  ['Mint Chocolate', 'Chocolate', 28.00, 120],
  ['Jelly Beans', 'Candy', 18.00, 180],
  ['Dark Chocolate', 'Chocolate', 45.00, 90],
  ['Cotton Candy', 'Candy', 25.00, 60],
  ['Fudge Brownie', 'Bakery', 55.00, 50],
  ['Sour Patch Kids', 'Candy', 28.00, 130],
  ['White Chocolate', 'Chocolate', 32.00, 110],
  ['Rock Candy', 'Candy', 12.00, 140],
  ['Truffles', 'Chocolate', 90.00, 40],
  ['Licorice', 'Candy', 18.00, 100],
  ['Peppermint Candy', 'Candy', 8.00, 250],
  ['Chocolate Chip Cookie', 'Bakery', 35.00, 70],
  ['Marshmallows', 'Candy', 22.00, 160],
  ['Fruit Gummies', 'Candy', 22.00, 120],
  ['Honeycomb', 'Toffee', 35.00, 55],
  ['Chocolate Covered Nuts', 'Chocolate', 70.00, 65],
];

async function addDemoData() {
  try {
    console.log('🍬 Adding demo sweets data...\n');
    
    // Check if data already exists
    const checkResult = await pool.query('SELECT COUNT(*) FROM sweets');
    const existingCount = parseInt(checkResult.rows[0].count);
    
    if (existingCount > 0) {
      console.log(`⚠️  Database already contains ${existingCount} sweets.`);
      console.log('Skipping demo data insertion to avoid duplicates.\n');
      console.log('If you want to add demo data anyway, clear the sweets table first.');
      await pool.end();
      return;
    }

    // Insert demo data
    const insertQuery = `
      INSERT INTO sweets (name, category, price, quantity) 
      VALUES ($1, $2, $3, $4)
    `;

    for (const [name, category, price, quantity] of demoData) {
      await pool.query(insertQuery, [name, category, price, quantity]);
      console.log(`✅ Added: ${name} (${category}) - ₹${price.toFixed(2)}`);
    }

    console.log(`\n✅ Successfully added ${demoData.length} sweets to the database!`);
    console.log('You can now view them in the application at http://localhost:3000\n');
    
  } catch (error) {
    console.error('❌ Error adding demo data:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

addDemoData();

