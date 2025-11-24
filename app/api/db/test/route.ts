import { query } from '@/lib/db/client';
import { NextResponse } from 'next/server';

/**
 * Test database connection endpoint
 * GET /api/db/test
 */
export async function GET() {
  try {
    // Simple query to test connection
    const result = await query('SELECT NOW() as current_time, version() as pg_version');
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error('Database connection test failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}

