/**
 * Database configuration
 * Centralized configuration for PostgreSQL connection
 */

export const databaseUrl = process.env.DATABASE_URL;

export const isDatabaseConfigured = !!databaseUrl;

