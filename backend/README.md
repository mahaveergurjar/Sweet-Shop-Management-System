# Sweet Shop Backend API

Backend API for the Sweet Shop Management System built with Node.js, TypeScript, Express, and PostgreSQL.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up PostgreSQL database:
```bash
# Create database
createdb sweet_shop

# Run migrations
psql -d sweet_shop -f migrations/001_initial_schema.sql
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials.

5. Run the server:
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

## Testing

Run tests:
```bash
npm test
npm run test:watch
npm run test:coverage
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets (query params: name, category, minPrice, maxPrice)
- `GET /api/sweets/:id` - Get sweet by ID
- `POST /api/sweets` - Create sweet (Admin only)
- `PUT /api/sweets/:id` - Update sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only)

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

