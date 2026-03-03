/**
 * Central API base URL — reads from env var so localhost is replaced
 * automatically in production deployments.
 *
 * Set NEXT_PUBLIC_API_URL in your .env.local (dev) or Vercel/hosting env vars.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
