# Sweet Shop Management System

A full-stack TDD kata project implementing a complete sweet shop management system with authentication, inventory management, and a modern UI.

## Project Structure

```
sweet-shop-management/
├── backend/          # Node.js/TypeScript + Express API
├── frontend/         # React + TypeScript SPA
├── setup.sh          # Setup script
└── README.md
```

## Technology Stack

### Backend
- Node.js with TypeScript
- Express.js
- PostgreSQL
- JWT for authentication
- Jest for testing
- Express Validator for input validation

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for routing
- Zustand for state management
- Axios for API calls

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Quick Setup

1. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

2. **Set up the database:**
   ```bash
   # Create database
   createdb sweet_shop

   # Run migrations
   psql -d sweet_shop -f backend/migrations/001_initial_schema.sql
   ```

3. **Configure environment variables:**
   - Copy `backend/.env.example` to `backend/.env`
   - Update database credentials in `backend/.env`

4. **Start the backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend runs on http://localhost:3001

5. **Start the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on http://localhost:3000

## Manual Setup

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Features

### Authentication
- User registration with email validation
- User login with JWT token
- Protected routes
- Admin role support

### Sweet Management
- View all available sweets
- Search sweets by name, category, or price range
- Purchase sweets (decreases quantity)
- Admin-only: Add, update, and delete sweets
- Admin-only: Restock sweets

### User Interface
- Modern, responsive design
- Intuitive navigation
- Real-time inventory updates
- Search and filter functionality
- Admin panel for inventory management

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

## Testing

### Backend Tests
```bash
cd backend
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Automated Testing with GitHub Actions

This project uses GitHub Actions for continuous integration. Tests automatically run on:
- Every push to `main` or `develop` branches
- Every pull request targeting `main` or `develop`

**What gets tested:**
- ✅ Backend test suite (Jest)
- ✅ Database migrations
- ✅ Frontend linting
- ✅ Frontend build
- ✅ Test coverage reports

**View test results:**
1. Go to the "Actions" tab in your GitHub repository
2. Click on any workflow run to see detailed results
3. Green checkmark ✅ = all tests passed
4. Red X ❌ = tests failed (click to see details)

**Workflow files:**
- `.github/workflows/ci.yml` - Main CI/CD pipeline
- `.github/workflows/test.yml` - Test suite only

For more details, see [.github/workflows/README.md](.github/workflows/README.md)

## Development Approach

This project follows **Test-Driven Development (TDD)** principles:
- Tests are written before implementation
- Red-Green-Refactor cycle
- High test coverage for backend services
- Clean, maintainable code following SOLID principles

## Database Schema

### Users Table
- `id` (SERIAL PRIMARY KEY)
- `email` (VARCHAR, UNIQUE)
- `password_hash` (VARCHAR)
- `is_admin` (BOOLEAN)
- `created_at` (TIMESTAMP)

### Sweets Table
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `category` (VARCHAR)
- `price` (DECIMAL)
- `quantity` (INTEGER)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## My AI Usage

### AI Tools Used

I used the following AI tools throughout the development of this project:

1. **Claude (Anthropic)** - Primary AI assistant for code generation and problem-solving
2. **Google Gemini** - Used for test generation and brainstorming API structures

### How I Used AI Tools

#### 1. Project Structure and Setup (Claude)
- **Initial project scaffolding**: I asked Claude to help me set up the basic project structure for a full-stack TypeScript application with Express backend and React frontend.
- **Configuration files**: Claude helped generate `tsconfig.json`, `vite.config.ts`, `jest.config.js`, and other configuration files with appropriate settings.
- **Database schema design**: Discussed the database schema with Claude to ensure proper relationships and constraints.

#### 2. Backend Development (Gemini)
- **Model layer**: Gemini generated the initial structure for User, Sweet, and Purchase models with TypeScript interfaces. I then modified them to fit my specific requirements.
- **Service layer**: Used Gemini to generate boilerplate code for authService and sweetService. I added the business logic and validation rules myself.
- **Controller layer**: Gemini helped create the controller structure with proper error handling patterns. I implemented the specific validation and response logic.
- **Route configuration**: Generated route files with middleware setup using Gemini, then I customized them for my authentication and authorization needs.
- **JWT implementation**: Gemini provided the initial JWT utility functions, which I adapted for my token structure.

#### 3. Test-Driven Development (Gemini)
- **Test structure**: Used Gemini to brainstorm test cases and test structure for the TDD approach.
- **Test generation**: Gemini helped generate initial test templates for authService and sweetService tests. I wrote the actual test assertions and edge cases.
- **Integration tests**: Gemini assisted in setting up Supertest integration tests for API routes. I added specific test scenarios.

#### 4. Frontend Development (Claude)
- **Component structure**: Claude generated the initial React component structure for Login, Register, Dashboard, and AdminPanel pages. I customized the UI/UX and styling.
- **State management**: Discussed Zustand setup with Claude and implemented the authStore based on the pattern.
- **API service layer**: Claude generated the axios instance and service methods. I added error handling and token management.
- **Routing**: Used Claude to set up React Router configuration with protected routes.

#### 5. Database Migrations (Gemini)
- **SQL schema**: Gemini helped write the initial SQL migration files. I reviewed and modified them for my specific requirements.
- **Demo data**: Generated demo data script with Gemini's assistance, then I updated prices to Indian Rupees.

#### 6. Problem Solving and Debugging (Gemini)
- **Type conversion issues**: When I encountered the price type issue (PostgreSQL DECIMAL returning as string), Gemini helped identify the problem and suggested the `mapRowToSweet` solution.
- **Purchase history feature**: Discussed the implementation approach with Gemini, who suggested the purchases table structure and integration points.

#### 7. Documentation (Claude)
- **README structure**: Claude helped organize the README with proper sections and formatting.
- **Code comments**: Used Claude to ensure meaningful comments in complex sections of code.

### My Reflection on AI Impact

**Positive Impacts:**
1. **Faster Development**: AI tools significantly accelerated the initial setup and boilerplate code generation, allowing me to focus on business logic and problem-solving.
2. **Learning Tool**: When Gemini (for backend) or Claude (for frontend) explained code patterns, I learned better practices for TypeScript, React, and Express.
3. **Error Resolution**: AI was invaluable for debugging - Gemini quickly identified issues like the PostgreSQL type conversion problem that would have taken me longer to solve.
4. **Code Quality**: AI suggestions helped me write cleaner, more maintainable code following best practices.

**Challenges and Learning:**
1. **Understanding vs. Copying**: I made sure to understand every piece of AI-generated code before using it. I often refactored or modified AI suggestions to better fit my needs.
2. **Customization Required**: While AI generated good boilerplate, I had to customize most of it for my specific requirements (like Indian currency, purchase history, etc.).
3. **Testing**: I found that AI-generated tests needed significant modification to match my actual implementation and edge cases.

**Ethical Considerations:**
- I used AI as a coding assistant, not as a replacement for my own understanding
- All code was reviewed, understood, and modified by me before committing
- I maintained transparency by documenting AI usage and using co-author commits
- The final codebase reflects my understanding and decisions, augmented by AI assistance

**Conclusion:**
AI tools were instrumental in this project, acting as a pair programming partner that helped with boilerplate, debugging, and learning. Gemini was primarily used for backend development and testing, while Claude was used for complex frontend components. However, the architecture decisions, business logic, customizations, and final implementation are my own work. This project demonstrates how AI can enhance productivity while maintaining code ownership and understanding.

### Co-Author Commits

Throughout the Git history, you'll find commits with co-author trailers indicating where AI assistance was used:
- `Co-authored-by: Gemini <noreply@google.com>` - For backend code generation, testing, and problem-solving
- `Co-authored-by: Claude <noreply@anthropic.com>` - For complex frontend components and UI development

This transparency ensures that AI contributions are properly attributed while maintaining clear ownership of the codebase.

## Deployment

### Deploy to Vercel

This project can be deployed **fully on Vercel** (frontend + backend) or use a hybrid approach.

**Option 1: Full Stack on Vercel (Recommended) ⭐**
1. Deploy backend to Vercel as serverless functions (see [VERCEL_BACKEND_DEPLOYMENT.md](VERCEL_BACKEND_DEPLOYMENT.md))
2. Deploy frontend to Vercel
3. Set up external database (Supabase recommended - free)
4. Configure environment variables

**Option 2: Hybrid Deployment**
1. Deploy backend to Railway or Render (see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md))
2. Deploy frontend to Vercel
3. Set `VITE_API_URL` environment variable in Vercel to your backend URL

**Detailed Guides:**
- Full stack on Vercel: [VERCEL_BACKEND_DEPLOYMENT.md](VERCEL_BACKEND_DEPLOYMENT.md)
- Hybrid deployment: [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

### Deployment Platforms

- **Frontend**: Vercel (recommended) or Netlify
- **Backend**: Vercel (serverless), Railway, Render, or Heroku
- **Database**: Supabase (free), Railway, Render, or Neon

## License

ISC

