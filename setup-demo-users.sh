#!/bin/bash

echo "🍬 Setting up demo users"
echo "========================"
echo ""

# Make admin user
echo "Making admin@example.com an admin user..."
sudo -u postgres psql -d sweet_shop -c "UPDATE users SET is_admin = true WHERE email = 'admin@example.com';"

echo ""
echo "✅ Demo users setup complete!"
echo ""
echo "Demo Login Credentials:"
echo "======================"
echo ""
echo "Regular User:"
echo "  Email: demo@example.com"
echo "  Password: demo123"
echo ""
echo "Admin User:"
echo "  Email: admin@example.com"
echo "  Password: admin123"
echo ""
echo "You can now log in at http://localhost:3000"

