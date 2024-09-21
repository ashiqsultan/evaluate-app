import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import config from '../config';
import * as schema from './schema';

const client = new Client({
  connectionString: config.DB_URL,
});

async function runMigrations() {
  try {
    await client.connect();
    console.log('Running migrations...');

    const db = drizzle(client, { schema });
    await migrate(db, { migrationsFolder: './src/db/migrations' });

    console.log('Migrations completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    console.log('Closing client...');
    await client.end(); // Close the client after migrations
    console.log('Client closed.');
  }
}

runMigrations();
