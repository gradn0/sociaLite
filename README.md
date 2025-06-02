# SociaLite

A ligthweight social media platform built in Nextjs and PostgreSQL.

### Features:
- Create posts with attached images
- Like and comment on other posts
- Add/remove friends
- Create and manage groups
- Full authentication flow and profile management

## Run locally (Ubunti/Debian based distros)
### Clone the repository
```
  git clone https://github.com/gradn0/socialite.git
  cd socialite
  npm install
  npm run dev
```
### Set up PostgreSQL
1. Ensure that you have docker installed and run
```
  docker compose up -d
```
2. Add the following to your .env file:
```
  DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb"
```
3. Generate the prisma schema
```
  npx prisma migrate dev --name init
  npx prisma generate
```
### Add Clerk secrets
Sign in to clerk and add the following to your .env file
```
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  CLERK_SECRET_KEY=
```
# Screenshots

<img src="/screenshots/desktop.png">
<div style="display: flex;">
  <img src="/screenshots/mobile1.png" style="display: inline;">
  <img src="/screenshots/mobile2.png" style="display: inline;">
</div>
