#!/bin/bash

echo "🍬 Setting up Sweet Shop Database"
echo "=================================="
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed."
    echo "Please install it first: sudo pacman -S postgresql"
    echo "See INSTALL_POSTGRESQL.md for detailed instructions"
    exit 1
fi

echo "✅ PostgreSQL found"
echo ""

# Check if PostgreSQL service is running
if ! systemctl is-active --quiet postgresql; then
    echo "⚠️  PostgreSQL service is not running."
    echo "Starting PostgreSQL service..."
    sudo systemctl start postgresql
    if [ $? -eq 0 ]; then
        echo "✅ PostgreSQL service started"
    else
        echo "❌ Failed to start PostgreSQL service"
        echo "Please start it manually: sudo systemctl start postgresql"
        exit 1
    fi
else
    echo "✅ PostgreSQL service is running"
fi

echo ""

# Check if database exists
DB_EXISTS=$(sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -w sweet_shop | wc -l)

if [ $DB_EXISTS -eq 0 ]; then
    echo "Creating database 'sweet_shop'..."
    sudo -u postgres createdb sweet_shop
    if [ $? -eq 0 ]; then
        echo "✅ Database created successfully"
    else
        echo "❌ Failed to create database"
        exit 1
    fi
else
    echo "✅ Database 'sweet_shop' already exists"
fi

echo ""

# Run migration
MIGRATION_FILE="backend/migrations/001_initial_schema.sql"
if [ -f "$MIGRATION_FILE" ]; then
    echo "Running database migration..."
    sudo -u postgres psql -d sweet_shop -f "$MIGRATION_FILE"
    if [ $? -eq 0 ]; then
        echo "✅ Migration completed successfully"
    else
        echo "❌ Migration failed"
        exit 1
    fi
else
    echo "❌ Migration file not found: $MIGRATION_FILE"
    exit 1
fi

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Start the backend: cd backend && npm run dev"
echo "3. Start the frontend: cd frontend && npm run dev"

