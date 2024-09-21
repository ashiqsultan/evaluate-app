import { defineConfig } from 'drizzle-kit';
import config from './src/config';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',

  out: './src/db/migrations',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: config.DB_URL,
  },
});
