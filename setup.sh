#!/bin/bash

echo "🍬 Sweet Shop Management System - Setup Script"
echo "=============================================="
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

echo "✅ PostgreSQL found"
echo ""

# Setup backend
echo "📦 Setting up backend..."
cd backend

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials"
fi

cd ..

# Setup frontend
echo "📦 Setting up frontend..."
cd frontend

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your PostgreSQL credentials"
echo "2. Create the database: createdb sweet_shop"
echo "3. Run the migration: psql -d sweet_shop -f backend/migrations/001_initial_schema.sql"
echo "4. Start the backend: cd backend && npm run dev"
echo "5. Start the frontend: cd frontend && npm run dev"
echo ""
echo "Backend will run on http://localhost:3001"
echo "Frontend will run on http://localhost:3000"

