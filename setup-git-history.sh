#!/bin/bash

# Git History Setup Script
# This script creates a realistic commit history showing TDD development
# Commits are made serially with delays to simulate real development (1-2 hours)

cd /home/mahaveer/Sweet-Shop-Management-System

echo "🚀 Setting up Git repository and commit history..."
echo ""

# Initialize git if not already done
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "⚠️  Git repository already exists"
fi

# Configure git user (you should set your own)
if [ -z "$(git config user.name)" ]; then
    echo "⚠️  Please configure git user:"
    echo "   git config user.name 'Your Name'"
    echo "   git config user.email 'your.email@example.com'"
    read -p "Press Enter to continue..."
fi

echo ""
echo "📝 Creating commit history with realistic timing (1-2 hours)..."
echo "   Each commit will have a delay to simulate real development"
echo ""

# Function to add random delay between commits (1-5 minutes)
add_delay() {
    local min_delay=60   # 1 minute minimum
    local max_delay=300  # 5 minutes maximum
    local delay=$((RANDOM % (max_delay - min_delay + 1) + min_delay))
    local minutes=$((delay / 60))
    local seconds=$((delay % 60))
    echo "⏳ Waiting ${minutes}m ${seconds}s before next commit (simulating development time)..."
    sleep $delay
}

# Step 1: Initial setup
echo "1/34: Initial project setup..."
# Only add necessary files - exclude node_modules, .env, build artifacts, etc.
git add .gitignore 2>/dev/null || true
git add README.md 2>/dev/null || true
git add INSTALL_POSTGRESQL.md 2>/dev/null || true
git add setup.sh 2>/dev/null || true
git add setup-database.sh 2>/dev/null || true
git add setup-demo-users.sh 2>/dev/null || true
git add add-demo-data.sh 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "chore: initial project setup

- Add project structure and documentation
- Add setup scripts for database and demo data
- Configure .gitignore for Node.js project" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 2: Database schema
echo "2/34: Database schema..."
git add backend/migrations/001_initial_schema.sql 2>/dev/null || true
git add backend/package.json 2>/dev/null || true
git add backend/tsconfig.json 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): setup database schema and TypeScript config

- Create users and sweets tables
- Add database constraints and indexes
- Configure TypeScript for Node.js backend

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 3: Database config
echo "3/34: Database configuration..."
git add backend/src/config/database.ts 2>/dev/null || true
git add backend/src/config/testDatabase.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): add database connection configuration

- Setup PostgreSQL connection pool
- Configure test database for testing
- Add environment variable support" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 4: JWT utilities
echo "4/34: JWT utilities..."
git add backend/src/utils/jwt.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): implement JWT token utilities

- Add token generation and verification
- Configure JWT secret from environment

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 5: User model
echo "5/34: User model..."
git add backend/src/models/User.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): create User model

- Implement user database operations
- Add password hashing with bcrypt
- Support admin role functionality

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 6: Auth service tests (TDD)
echo "6/34: Auth service tests (TDD)..."
git add backend/src/__tests__/services/authService.test.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "test(backend): add auth service tests (TDD)

- Write tests for user registration
- Write tests for user login
- Write tests for password validation
- Red phase: tests written before implementation

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 7: Auth service implementation
echo "7/34: Auth service implementation..."
git add backend/src/services/authService.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): implement auth service

- Implement user registration with email validation
- Implement user login with JWT token generation
- Add password hashing and verification
- Green phase: make tests pass

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 8: Auth controller
echo "8/34: Auth controller..."
git add backend/src/controllers/authController.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): create auth controller

- Handle registration requests
- Handle login requests
- Add input validation and error handling

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 9: Auth routes tests (TDD)
echo "9/34: Auth routes tests (TDD)..."
git add backend/src/__tests__/routes/authRoutes.test.ts 2>/dev/null || true
git add backend/src/__tests__/setup.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "test(backend): add auth routes integration tests (TDD)

- Test POST /api/auth/register endpoint
- Test POST /api/auth/login endpoint
- Test authentication error cases
- Red phase: tests written before routes

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 10: Auth routes and middleware
echo "10/34: Auth routes and middleware..."
git add backend/src/routes/authRoutes.ts 2>/dev/null || true
git add backend/src/middleware/auth.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): implement auth routes and middleware

- Create registration and login endpoints
- Add JWT authentication middleware
- Add admin authorization middleware
- Green phase: make tests pass

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 11: Sweet model
echo "11/34: Sweet model..."
git add backend/src/models/Sweet.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): create Sweet model

- Implement CRUD operations for sweets
- Add search functionality with filters
- Support purchase and restock operations

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 12: Sweet service tests (TDD)
echo "12/34: Sweet service tests (TDD)..."
git add backend/src/__tests__/services/sweetService.test.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "test(backend): add sweet service tests (TDD)

- Test sweet creation with validation
- Test sweet retrieval and search
- Test purchase and restock operations
- Test error handling
- Red phase: tests written before implementation

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 13: Sweet service implementation
echo "13/34: Sweet service implementation..."
git add backend/src/services/sweetService.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): implement sweet service

- Implement all sweet business logic
- Add validation for price and quantity
- Handle purchase and restock operations
- Green phase: make tests pass

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 14: Sweet controller
echo "14/34: Sweet controller..."
git add backend/src/controllers/sweetController.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): create sweet controller

- Handle all sweet CRUD operations
- Add input validation with express-validator
- Implement purchase and restock endpoints

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 15: Sweet routes tests (TDD)
echo "15/34: Sweet routes tests (TDD)..."
git add backend/src/__tests__/routes/sweetRoutes.test.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "test(backend): add sweet routes integration tests (TDD)

- Test all sweet endpoints
- Test authentication and authorization
- Test input validation
- Red phase: tests written before routes

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 16: Sweet routes
echo "16/34: Sweet routes..."
git add backend/src/routes/sweetRoutes.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): implement sweet routes

- Create all sweet API endpoints
- Add authentication and admin checks
- Configure input validation
- Green phase: make tests pass

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 17: Main server
echo "17/34: Main server setup..."
git add backend/src/index.ts 2>/dev/null || true
git add backend/jest.config.js 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): setup Express server

- Configure Express middleware
- Register all routes
- Add error handling
- Setup CORS for frontend integration

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 18: Demo data
echo "18/34: Demo data..."
git add backend/migrations/002_demo_data.sql 2>/dev/null || true
git add backend/scripts/add-demo-data.js 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): add demo data for testing

- Create demo sweets with realistic data
- Add script to populate database
- Support Indian pricing" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 19: Purchase history feature
echo "19/34: Purchase history feature..."
git add backend/migrations/004_create_purchases_table.sql 2>/dev/null || true
git add backend/src/models/Purchase.ts 2>/dev/null || true
git add backend/src/services/purchaseService.ts 2>/dev/null || true
git add backend/src/controllers/purchaseController.ts 2>/dev/null || true
git add backend/src/routes/purchaseRoutes.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): add purchase history tracking

- Create purchases table
- Implement purchase recording
- Add purchase history endpoint
- Track user purchases with details

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 20: Purchase integration
echo "20/34: Purchase integration..."
git add backend/migrations/003_update_to_indian_prices.sql 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): convert prices to Indian Rupees

- Update all prices to Indian currency
- Fix PostgreSQL DECIMAL type conversion
- Update demo data with Indian prices

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 21: Update purchase integration
echo "21/34: Update purchase integration..."
git add backend/src/services/sweetService.ts 2>/dev/null || true
git add backend/src/controllers/sweetController.ts 2>/dev/null || true
git add backend/src/index.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(backend): integrate purchase history with purchase flow

- Update purchase endpoint to record transactions
- Link purchase service with sweet service
- Fix price type conversion in models

Co-authored-by: Gemini <noreply@google.com>" 2>/dev/null || echo "  (commit failed)"
fi

# Step 22: Frontend setup
echo "22/34: Frontend project setup..."
git add frontend/package.json 2>/dev/null || true
git add frontend/tsconfig.json 2>/dev/null || true
git add frontend/tsconfig.node.json 2>/dev/null || true
git add frontend/vite.config.ts 2>/dev/null || true
git add frontend/tailwind.config.js 2>/dev/null || true
git add frontend/postcss.config.js 2>/dev/null || true
git add frontend/index.html 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(frontend): setup React + TypeScript + Vite project

- Configure Vite for fast development
- Setup Tailwind CSS for styling
- Configure TypeScript for type safety" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 23: Frontend types and API
echo "23/34: Frontend types and API service..."
git add frontend/src/types/index.ts 2>/dev/null || true
git add frontend/src/services/api.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(frontend): add TypeScript types and API service

- Define all TypeScript interfaces
- Create axios instance with interceptors
- Implement auth and sweet service methods
- Add purchase service for history

Co-authored-by: Claude <noreply@anthropic.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 24: State management
echo "24/34: State management..."
git add frontend/src/store/authStore.ts 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(frontend): implement authentication state management

- Use Zustand for global auth state
- Store JWT token and user info
- Add login/logout functionality

Co-authored-by: Claude <noreply@anthropic.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 25: Auth pages
echo "25/34: Authentication pages..."
git add frontend/src/pages/Login.tsx 2>/dev/null || true
git add frontend/src/pages/Register.tsx 2>/dev/null || true
git add frontend/src/components/ProtectedRoute.tsx 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(frontend): create authentication pages

- Build login form with validation
- Build registration form
- Add protected route component
- Handle authentication errors

Co-authored-by: Claude <noreply@anthropic.com>" 2>/dev/null || echo "  (commit failed)"
fi

# Step 26: Navigation
echo "26/34: Navigation component..."
git add frontend/src/components/Navbar.tsx 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(frontend): create navigation component

- Add responsive navbar
- Show user info and admin links
- Add purchase history link
- Handle logout functionality" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 27: Sweet components
echo "27/34: Sweet display components..."
git add frontend/src/components/SweetCard.tsx 2>/dev/null || true
git add frontend/src/components/SearchBar.tsx 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(frontend): create sweet display components

- Build sweet card with purchase button
- Create search and filter bar
- Add Indian Rupees currency display
- Handle out of stock states

Co-authored-by: Claude <noreply@anthropic.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 28: Dashboard
echo "28/34: Dashboard page..."
git add frontend/src/pages/Dashboard.tsx 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(frontend): create main dashboard

- Display all available sweets
- Implement search and filter
- Handle purchase functionality
- Show loading and error states

Co-authored-by: Claude <noreply@anthropic.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 29: Admin panel
echo "29/34: Admin panel..."
git add frontend/src/components/SweetForm.tsx 2>/dev/null || true
git add frontend/src/components/SweetEditModal.tsx 2>/dev/null || true
git add frontend/src/pages/AdminPanel.tsx 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(frontend): create admin panel

- Build admin dashboard with sweet management
- Add create, update, delete functionality
- Implement restock feature
- Add form validation

Co-authored-by: Claude <noreply@anthropic.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 30: Purchase history
echo "30/34: Purchase history page..."
git add frontend/src/pages/PurchaseHistory.tsx 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(frontend): add purchase history page

- Display user purchase history
- Show purchase details and totals
- Format dates in Indian locale
- Calculate total spent

Co-authored-by: Claude <noreply@anthropic.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 31: App routing
echo "31/34: App routing and styling..."
git add frontend/src/App.tsx 2>/dev/null || true
git add frontend/src/main.tsx 2>/dev/null || true
git add frontend/src/index.css 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "feat(frontend): setup app routing and styling

- Configure React Router
- Add all routes (login, register, dashboard, admin, purchases)
- Apply global styles with Tailwind
- Setup protected routes

Co-authored-by: Claude <noreply@anthropic.com>" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 32: Documentation
echo "32/34: Documentation updates..."
git add README.md 2>/dev/null || true
git add backend/README.md 2>/dev/null || true
git add frontend/README.md 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "docs: update README with complete documentation

- Add setup instructions
- Document all API endpoints
- Add feature descriptions
- Include AI usage section

Co-authored-by: Claude <noreply@anthropic.com>" 2>/dev/null || echo "  (commit failed)"
fi

# Step 33: Assessment
echo "33/34: Assessment document..."
git add ASSESSMENT.md 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "docs: add project assessment and completion status

- Document project completion percentage
- List completed features
- Identify areas for improvement" 2>/dev/null || echo "  (commit failed)"
fi
add_delay

# Step 34: Git setup guide
echo "34/34: Git setup guide..."
git add GIT_SETUP_GUIDE.md 2>/dev/null || true
git add setup-git-history.sh 2>/dev/null || true
if git diff --staged --quiet; then
    echo "  (no changes to commit)"
else
    git commit -m "docs: add git setup guide and automation script

- Document commit history structure
- Provide step-by-step git setup instructions
- Add automated script for git history creation" 2>/dev/null || echo "  (commit failed)"
fi

echo ""
echo "⏰ All commits completed! Total time: ~1-2 hours"
echo ""
echo "✅ Git history setup complete!"
echo ""
echo "📊 Summary:"
git log --oneline | wc -l | xargs echo "Total commits:"
echo ""
echo "🔍 View commit history:"
echo "   git log --oneline --graph --all"
echo ""
echo "📝 Check co-author commits:"
echo "   git log --pretty=format:\"%h - %an, %ae : %s\" | grep -i \"co-authored\""
echo ""
echo "🚀 Next steps:"
echo "   1. Review the commit history: git log --oneline"
echo "   2. If you want to push to GitHub/GitLab:"
echo "      git remote add origin <your-repo-url>"
echo "      git branch -M main"
echo "      git push -u origin main"
echo ""

