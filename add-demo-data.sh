#!/bin/bash

echo "🍬 Adding Demo Sweets Data"
echo "=========================="
echo ""

MIGRATION_FILE="backend/migrations/002_demo_data.sql"

if [ -f "$MIGRATION_FILE" ]; then
    echo "Inserting demo sweets into database..."
    sudo -u postgres psql -d sweet_shop -f "$MIGRATION_FILE"
    if [ $? -eq 0 ]; then
        echo "✅ Demo data added successfully!"
        echo ""
        echo "Added 20 different sweets to the database."
        echo "You can now view them in the application at http://localhost:3000"
    else
        echo "❌ Failed to add demo data"
        exit 1
    fi
else
    echo "❌ Demo data file not found: $MIGRATION_FILE"
    exit 1
fi

echo ""
echo "To verify, you can check the database:"
echo "  sudo -u postgres psql -d sweet_shop -c 'SELECT COUNT(*) FROM sweets;'"

