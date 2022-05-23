## Database

### Database creating and connection and permissions granted

- CREATE DATABASE shopping;
- \c shopping
- GRANT ALL PRIVILEGES ON DATABASE shopping TO postgres

### Script

- yarn watch
- db-migrate up
- db-migrate down

### env declarations

ENV=DEV
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=salmasadekk
SALT_ROUNDS=10
PEPPER=valuespepper
TOKEN_SECRET=testToken
