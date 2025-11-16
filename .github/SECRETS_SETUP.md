# GitHub Secrets Setup Guide

## 🔒 Security Best Practices

The GitHub Actions workflows use **GitHub Secrets** to securely store sensitive credentials. This prevents credentials from being exposed in the repository code.

## ⚠️ Important Notes

### Current Setup (Safe for Test Credentials)

The workflows are configured with **fallback values** for test database credentials:
- Default test credentials are visible in the workflow files
- This is **OK** because:
  - ✅ They're only for CI/CD test databases
  - ✅ Test databases are isolated and ephemeral (created fresh for each test run)
  - ✅ They're not production credentials
  - ✅ The database is only accessible within GitHub Actions

### When to Use Secrets

You **MUST** use GitHub Secrets for:
- ❌ Production database credentials
- ❌ Real API keys
- ❌ JWT secrets (if using real ones)
- ❌ Third-party service credentials
- ❌ Any sensitive production data

## 🔐 Setting Up GitHub Secrets (Optional but Recommended)

If you want to hide even test credentials, follow these steps:

### Step 1: Go to Repository Settings

1. Go to your GitHub repository
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add Secrets

Click **New repository secret** and add these secrets:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `TEST_DB_USER` | `postgres` | Test database username |
| `TEST_DB_PASSWORD` | `your-secure-password` | Test database password |
| `TEST_DB_NAME` | `sweet_shop_test` | Test database name |
| `JWT_SECRET` | `your-jwt-secret-key` | JWT signing secret |

### Step 3: Workflow Will Use Secrets Automatically

Once you add the secrets, the workflows will automatically use them instead of the default values.

## 📋 How It Works

The workflows use this pattern:
```yaml
POSTGRES_USER: ${{ secrets.TEST_DB_USER || 'postgres' }}
```

This means:
- If `TEST_DB_USER` secret exists → use it
- If not → use default value `'postgres'`

## ✅ Current Security Status

**For Test Credentials (Current Setup):**
- ✅ Safe to have defaults visible (test DB only)
- ✅ Database is isolated in GitHub Actions
- ✅ No external access possible
- ✅ Database is destroyed after each test run

**For Production (Future):**
- ❌ Never commit production credentials
- ❌ Always use GitHub Secrets
- ❌ Use environment-specific secrets
- ❌ Rotate secrets regularly

## 🚨 Security Checklist

- [ ] Test credentials are safe to expose (current setup)
- [ ] Production credentials are in GitHub Secrets
- [ ] JWT secrets are in GitHub Secrets (if using real ones)
- [ ] API keys are in GitHub Secrets
- [ ] No hardcoded passwords in code
- [ ] `.env` files are in `.gitignore`

## 📚 Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Actions Security Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)

