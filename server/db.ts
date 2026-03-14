import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing!");
}

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // This is the CRITICAL fix for local machines connecting to Neon
    rejectUnauthorized: false 
  },
  connectionTimeoutMillis: 5000 // Stops it from hanging forever if it fails
});

export const db = drizzle(pool, { schema });