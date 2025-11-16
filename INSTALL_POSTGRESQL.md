# Installing PostgreSQL on Arch Linux

## Installation Steps

1. **Install PostgreSQL:**
   ```bash
   sudo pacman -S postgresql
   ```

2. **Initialize the database cluster:**
   ```bash
   sudo -u postgres initdb -D /var/lib/postgres/data
   ```

3. **Start and enable PostgreSQL service:**
   ```bash
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

4. **Create a PostgreSQL user (optional, or use the default postgres user):**
   ```bash
   sudo -u postgres createuser --interactive
   ```
   Or create a user directly:
   ```bash
   sudo -u postgres createuser -s your_username
   ```

5. **Set a password for the postgres user (if using default user):**
   ```bash
   sudo -u postgres psql
   ```
   Then in the PostgreSQL prompt:
   ```sql
   ALTER USER postgres PASSWORD 'your_password';
   \q
   ```

6. **Create the database for the project:**
   ```bash
   sudo -u postgres createdb sweet_shop
   ```
   Or if you created your own user:
   ```bash
   createdb sweet_shop
   ```

7. **Run the migration:**
   ```bash
   psql -d sweet_shop -f backend/migrations/001_initial_schema.sql
   ```
   Or with sudo if using postgres user:
   ```bash
   sudo -u postgres psql -d sweet_shop -f backend/migrations/001_initial_schema.sql
   ```

## Quick Setup Script

After installing PostgreSQL, you can run these commands:

```bash
# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb sweet_shop

# Run migration
cd /home/mahaveer/sweet-shop-management
sudo -u postgres psql -d sweet_shop -f backend/migrations/001_initial_schema.sql
```

## Update Backend Configuration

After setting up PostgreSQL, update `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sweet_shop
DB_USER=postgres
DB_PASSWORD=your_password_here
```

## Verify Installation

Test the connection:
```bash
psql -U postgres -d sweet_shop
```

If successful, you should see the PostgreSQL prompt. Type `\q` to exit.

## Troubleshooting

- **If you get "peer authentication failed":**
  Edit `/etc/postgresql/pg_hba.conf` (or `/var/lib/postgres/data/pg_hba.conf`) and change authentication method to `md5` or `password` for local connections.

- **If service won't start:**
  Check logs: `sudo journalctl -u postgresql`

- **If you can't connect:**
  Make sure PostgreSQL is running: `sudo systemctl status postgresql`

