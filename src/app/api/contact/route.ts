import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for contacts (replace with database later)
const contacts: Array<{ name: string; email: string; subject: string; message: string; date: string }> = [];

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    if (!subject || !subject.trim()) {
      return NextResponse.json(
        { error: 'Subject is required' },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Length validation
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Input too long' },
        { status: 400 }
      );
    }

    // Store contact (in-memory for now, should use database)
    const contact = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
    };

    contacts.push(contact);

    // Log to console (in production, send email or store in database)
    console.log('📧 New Contact Form Submission:', contact);

    // TODO: Send email notification using Resend or SendGrid
    // TODO: Store in Supabase database

    return NextResponse.json({
      success: true,
      message: 'تم استقبال رسالتك بنجاح. شكرًا لتواصلك معنا.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة الرسالة' },
      { status: 500 }
    );
  }
}

// Admin endpoint to view contacts
export async function GET(request: NextRequest) {
  try {
    // Check if admin token is valid
    const adminToken = request.cookies.get('admin_token');
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminToken || !adminSecret || adminToken.value !== adminSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      count: contacts.length,
      contacts: contacts.slice(-50), // Last 50
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
