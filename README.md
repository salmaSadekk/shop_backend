## Database

### Database creating and connection and permissions granted

- CREATE DATABASE shopping;
- \c shopping
- GRANT ALL PRIVILEGES ON DATABASE shopping TO postgres

### Script

- yarn watch
- db-migrate up
- db-migrate down
- npm run test -> to have successful tests you need to create at least 1 entry in each table

### env declarations

ENV=dev
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_DB_test=shopping_test
POSTGRES_USER=postgres
POSTGRES_PORT=5432
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=salmasadekk
SALT_ROUNDS=10
PEPPER=valuespepper
TOKEN_SECRET=testToken
TEST_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJmaXJzdG5hbWUiOiJzYWxtYWFhYWEiLCJsYXN0bmFtZSI6InNhZGVra2siLCJwYXNzd29yZCI6IiQyYiQxMCRTMXFULzROdzM4MGVYYW9kakJBUEYuLmJmcS5FY0JBS2ZWSFd6d2R2RE83MmtreFc3UXdvaSIsImVtYWlsIjoibG9vb29vbCJ9LCJpYXQiOjE2NTM0MzA5MDd9.LNRUYLnl7q2YG1TbxEQWLxwkgv9sHw_c8L4v-Tl8QoM
