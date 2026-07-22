import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

function getOrSetUserId(cookieStore: Awaited<ReturnType<typeof cookies>>): string {
  let userId = cookieStore.get('devid_blog_user_id')?.value;
  if (!userId) {
    userId = crypto.randomUUID();
    cookieStore.set('devid_blog_user_id', userId, {
      maxAge: 60 * 60 * 24 * 365 * 10,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }
  return userId;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!db) {
      // Fallback: return empty comments list
      return NextResponse.json({
        comments: [],
        is_mock: true,
      });
    }

    const comments = await db`SELECT id, username, content, created_at FROM blog_comments WHERE slug = ${slug} ORDER BY created_at ASC`;

    return NextResponse.json({
      comments,
      is_mock: false,
    });
  } catch (error) {
    console.error('Comments GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { username, content } = body;

    if (!username?.trim() || !content?.trim()) {
      return NextResponse.json({ error: 'Username and content are required' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const userId = getOrSetUserId(cookieStore);

    if (!db) {
      // Fallback mock comment
      return NextResponse.json({
        success: true,
        comment: {
          id: Math.floor(Math.random() * 1000000),
          username: username.trim(),
          content: content.trim(),
          created_at: new Date().toISOString(),
        },
        is_mock: true,
      });
    }

    const result = await db`INSERT INTO blog_comments (slug, user_id, username, content) VALUES (${slug}, ${userId}, ${username.trim()}, ${content.trim()}) RETURNING id, username, content, created_at`;

    return NextResponse.json({
      success: true,
      comment: result[0],
      is_mock: false,
    });
  } catch (error) {
    console.error('Comments POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
