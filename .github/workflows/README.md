# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated testing and CI/CD.

## Workflows

### 1. `ci.yml` - Main CI/CD Pipeline
Runs on every push and pull request to `main` or `develop` branches.

**What it does:**
- Sets up PostgreSQL database service
- Installs backend and frontend dependencies
- Runs database migrations
- Executes backend test suite
- Generates test coverage reports
- Runs frontend linting
- Builds frontend application
- Uploads coverage reports to Codecov (optional)

### 2. `test.yml` - Test Suite Only
Focused workflow that runs only the test suite.

**What it does:**
- Sets up PostgreSQL database service
- Installs dependencies
- Runs database migrations
- Executes backend tests
- Generates coverage reports

## How It Works

### Automatic Triggers

The workflows automatically run when:
- You push code to `main` or `develop` branches
- You create a pull request targeting `main` or `develop`
- You update an existing pull request

### Database Setup

The workflows use GitHub Actions' service containers to spin up a PostgreSQL 15 database:
- Database name: `sweet_shop_test`
- User: `postgres`
- Password: `postgres`
- Port: `5432`

### Environment Variables

The following environment variables are automatically set in the CI environment:
- `NODE_ENV=test`
- `TEST_DB_HOST=localhost`
- `TEST_DB_PORT=5432`
- `TEST_DB_NAME=sweet_shop_test`
- `TEST_DB_USER=postgres`
- `TEST_DB_PASSWORD=postgres`
- `JWT_SECRET=test-secret-key-for-ci-cd-pipeline`

## Viewing Results

1. Go to your GitHub repository
2. Click on the "Actions" tab
3. Select the workflow run you want to view
4. Click on the job to see detailed logs

## Status Badges

You can add status badges to your README.md:

```markdown
![CI/CD Pipeline](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/CI/CD%20Pipeline/badge.svg)
![Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Run%20Tests/badge.svg)
```

## Troubleshooting

### Tests Fail in CI but Pass Locally

1. Check database connection settings
2. Verify all environment variables are set correctly
3. Ensure database migrations run successfully
4. Check that test database is properly initialized

### Coverage Reports Not Uploading

The Codecov upload is optional (`continue-on-error: true`). If you want to use Codecov:
1. Sign up at [codecov.io](https://codecov.io)
2. Add your repository
3. Get your upload token
4. Add it as a GitHub secret: `CODECOV_TOKEN`

### Frontend Build Fails

1. Check for TypeScript errors
2. Verify all dependencies are installed
3. Check for missing environment variables
4. Review build logs for specific errors

## Customization

### Adding More Test Steps

Edit `.github/workflows/ci.yml` and add new steps:

```yaml
- name: Run custom tests
  working-directory: ./backend
  run: npm run test:custom
```

### Changing Node.js Version

Update the `node-version` in the workflow file:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'  # Change version here
```

### Adding More Branches

Update the `on` section:

```yaml
on:
  push:
    branches: [ main, develop, feature/* ]
  pull_request:
    branches: [ main, develop ]
```

