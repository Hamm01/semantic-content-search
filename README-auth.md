# Authentication Setup Guide

This project uses **Better Auth** with **GitHub OAuth** for user authentication.

## Quick Start

### 1. Set up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your values:

- `BETTER_AUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `DATABASE_URL` - Your PostgreSQL connection string (from Neon)
- `GITHUB_CLIENT_ID` - From GitHub OAuth App settings
- `GITHUB_CLIENT_SECRET` - From GitHub OAuth App settings

### 2. Create GitHub OAuth App

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click "New OAuth App" or edit existing app
3. Add authorization callback URL: `http://localhost:3000/api/auth/github`
4. Generate Client ID and Client Secret
5. Copy both values to your `.env` file

### 3. Run Database Migrations

```bash
npm run db:push
# or for production:
npm run db:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

## Features

- ✅ GitHub OAuth authentication
- ✅ User profile display (image + name)
- ✅ Sign in/out functionality
- ✅ Session management
- ✅ Rate limiting

## File Structure

```
src/
├── lib/
│   ├── auth.ts              # Better Auth server config
│   └── auth-client.ts       # React client for frontend
├── db/
│   └── schema.ts            # Drizzle ORM schema
app/
├── api/auth/[...all]/route.ts  # Auth route handler
└── (home)/
    └── page.tsx             # Home page with auth UI
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `BETTER_AUTH_SECRET` | ✅ | Secret key for cookie signing (32+ chars) |
| `BETTER_AUTH_URL` | ⚠️ | App URL (use in production) |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `GITHUB_CLIENT_ID` | ✅ | GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | ✅ | GitHub OAuth Client Secret |

## Development Tips

- Generate secret: `openssl rand -base64 32`
- Neon database URL example: `postgresql://user:password@ep_...:5432/...`
- GitHub OAuth callback must match exactly what's in your app config

## Production Deployment

1. Set `BETTER_AUTH_URL` to your production domain
2. Use production database credentials
3. Generate strong secrets for all environment variables
4. Run migrations before deploying
