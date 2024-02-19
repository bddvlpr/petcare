import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/server/database/schema.ts',
  out: 'drizzle',
  driver: 'pg',
  dbCredentials: { connectionString: process.env.DATABASE_URL! },
  verbose: true,
  strict: true
});
