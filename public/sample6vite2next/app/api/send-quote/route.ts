import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize Twilio client with your credentials from environment variables
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req: NextRequest) {
  try {
    // Guard: ensure all required env vars are set
    const from = process.env.TWILIO_WHATSAPP_FROM;
    const to   = process.env.TWILIO_WHATSAPP_TO;

    if (!from || !to) {
      console.error('Missing Twilio environment variables.');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Parse the form data sent from the frontend
    const body = await req.json();
    const { name, email, phone, message } = body;

    // Validate that required fields exist
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // Build the WhatsApp notification message
    const whatsappMessage = `
🔔 *New Quote Request Received!*

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone || 'Not provided'}
💬 *Message:*
${message || 'No additional message'}

_Submitted via your website contact form._
    `.trim();

    // Send via Twilio WhatsApp
    await client.messages.create({
      from,   // ✅ guaranteed string — TypeScript is happy
      to,     // ✅ guaranteed string — TypeScript is happy
      body: whatsappMessage,
    });

    // Return success to the frontend
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: unknown) {
    console.error('Twilio WhatsApp error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { error: `Failed to send notification: ${errorMessage}` },
      { status: 500 }
    );
  }
}
