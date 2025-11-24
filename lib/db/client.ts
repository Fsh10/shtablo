import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  console.warn(
    "The DATABASE_URL is not set. PostgreSQL connection will not be available."
  );
}

/**
 * PostgreSQL connection pool
 * Uses connection pooling for better performance
 */
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : null;

// Handle pool errors
if (pool) {
  pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
  });
}

/**
 * Execute a query against the database
 * @param text SQL query string
 * @param params Query parameters
 * @returns Query result
 */
export async function query(text: string, params?: any[]) {
  if (!pool) {
    throw new Error('Database connection is not configured');
  }
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error', { text, error });
    throw error;
  }
}

/**
 * Get a client from the pool for transactions
 * @returns PostgreSQL client
 */
export async function getClient() {
  if (!pool) {
    throw new Error('Database connection is not configured');
  }
  return await pool.connect();
}

/**
 * Close the connection pool
 */
export async function closePool() {
  if (pool) {
    await pool.end();
  }
}

export default pool;

