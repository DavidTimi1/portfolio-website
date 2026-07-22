import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { escapeHtml, isValidEmail, sanitizeText } from '@/lib/security';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);
const MY_MAIL = process.env.MY_MAIL || '';

export async function POST(req: NextRequest) {
  // 1. Rate Limiting (5 contact requests per 15 minutes per IP)
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(`send_mail:${clientIp}`, 5, 15 * 60 * 1000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many contact requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.reset - Math.floor(Date.now() / 1000)),
        },
      }
    );
  }

  if (!MY_MAIL) {
    return NextResponse.json({ error: 'Mail service unavailable' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { body: rawMessage, subject: rawSubject, email: rawEmail, name: rawName } = body;

    // 2. Input Sanitization & Truncation
    const name = sanitizeText(rawName, 100);
    const email = sanitizeText(rawEmail, 255).toLowerCase();
    const subject = sanitizeText(rawSubject, 200);
    const message = sanitizeText(rawMessage, 5000);

    // 3. Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // 4. HTML Escaping to prevent Email HTML Injection / XSS
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    const { data, error } = await resend.emails.send({
      from: 'Dev_id <onboarding@resend.dev>',
      to: [MY_MAIL],
      subject: `REPLY PORTFOLIO: ${safeSubject}`,
      html: `<div> 
        Name: ${safeName} <br></br>
        Mail: <a href="mailto:${safeEmail}">${safeEmail}</a> <br></br>
        <p>
            <strong>${safeMessage}</strong>
        </p>
      </div>`,
    });

    if (error) {
      console.error('Resend email error:', error);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}