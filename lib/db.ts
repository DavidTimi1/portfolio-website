import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

export const db = databaseUrl ? neon(databaseUrl) : null;

if (!db) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'DATABASE_URL environment variable is missing. Blog interactions will fall back to mockup storage.'
    );
  }
}
