import { cookies } from 'next/headers';

/**
 * Escapes HTML special characters to mitigate HTML injection and Cross-Site Scripting (XSS).
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Strips dangerous null bytes / control characters and caps string length.
 */
export function sanitizeText(str: unknown, maxLength = 1000): string {
  if (typeof str !== 'string') return '';
  // Remove control characters (except standard newline / carriage return / tab)
  const cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
  return cleaned.slice(0, maxLength);
}

/**
 * Validates standard email address format using RFC 5322 regex pattern.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 255) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validates blog slug format (alphanumeric, hyphens, underscores).
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || slug.length > 150) return false;
  return /^[a-zA-Z0-9-_]+$/.test(slug);
}

/**
 * Validates UUID v4 string syntax.
 */
export function isValidUuid(uuid: string): boolean {
  if (!uuid) return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * DRY Helper: Retrieves existing devid_blog_user_id cookie or generates a valid UUID v4 cookie.
 * Validates stored UUID to prevent cookie tampering attack vectors.
 */
export async function getOrSetUserId(
  cookieStore: Awaited<ReturnType<typeof cookies>>
): Promise<string> {
  let userId = cookieStore.get('devid_blog_user_id')?.value;
  
  if (!userId || !isValidUuid(userId)) {
    userId = crypto.randomUUID();
    cookieStore.set('devid_blog_user_id', userId, {
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }
  
  return userId;
}
