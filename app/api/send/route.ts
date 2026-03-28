import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const MY_MAIL = process.env.MY_MAIL || '';


export async function POST(req: NextRequest) {
    const body = await req.json();
    const { body: message, subject, email, name } = body;
    if (!MY_MAIL){
        return Response.json({ error: "Owner must've pulled the plug" }, { status: 500 });
    }
    
    try {
        const { data, error } = await resend.emails.send({
            from: 'Dev_id <onboarding@resend.dev>',
            to: [MY_MAIL],
            subject: `REPLY PORTFOLIO: ${subject}`,
            html: `<div> 
                Name: ${name} <br></br>
                Mail: <a href="mailto:${email}">${email} </a> <br></br>
                <p>
                    <strong>${ message }</strong>
                </p>`,
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}