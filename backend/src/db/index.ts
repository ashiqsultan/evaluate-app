// import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import config from '../config';
import * as schema from './schema';

export const connectionPool = new Pool({
  connectionString: config.DB_URL,
});

export const db = drizzle(connectionPool, { schema });

export default db;
