/**
 * Example usage of PostgreSQL database connection
 * 
 * This file demonstrates how to use the database client in your Next.js API routes
 */

import { query, getClient } from './client';

/**
 * Example: Simple query
 */
export async function getUsers() {
  try {
    const result = await query('SELECT * FROM users LIMIT 10');
    return result.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

/**
 * Example: Parameterized query
 */
export async function getUserById(id: string) {
  try {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

/**
 * Example: Transaction
 */
export async function createUserWithTransaction(userData: {
  name: string;
  email: string;
}) {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    
    const insertUser = await client.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [userData.name, userData.email]
    );
    
    await client.query('COMMIT');
    return insertUser.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating user:', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Usage in Next.js API route:
 * 
 * // app/api/users/route.ts
 * import { getUsers } from '@/lib/db/example';
 * 
 * export async function GET() {
 *   try {
 *     const users = await getUsers();
 *     return Response.json(users);
 *   } catch (error) {
 *     return Response.json({ error: 'Failed to fetch users' }, { status: 500 });
 *   }
 * }
 */

