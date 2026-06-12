import { NextResponse } from 'next/server';

// Honeypot field name (must match frontend exactly)
const HONEYPOT_FIELD = 'website_url';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Honeypot check (Bot detection)
    if (body[HONEYPOT_FIELD]) {
      console.warn('Bot detected via honeypot');
      // Silently return 200 so bots think they succeeded
      return NextResponse.json({ success: true, message: 'Received' }, { status: 200 });
    }

    const { fullName, email, company, documentName } = body;

    // 2. Basic Validation
    if (!fullName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 3. Corporate Email Validation
    // Add known free email providers here to block them
    const freeEmailDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
      'aol.com', 'icloud.com', 'yandex.com', 'protonmail.com'
    ];
    
    const emailDomain = email.split('@')[1]?.toLowerCase();
    if (freeEmailDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: 'Please use a corporate email address' }, 
        { status: 400 }
      );
    }

    // 4. Send to CRM / WordPress / Webhook
    const webhookUrl = process.env.WP_LEAD_WEBHOOK || 'https://mock-webhook-url.com/leads';
    
    // Example: Forwarding to an external system
    /*
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CRM_API_KEY}`
      },
      body: JSON.stringify({
        fullName,
        email,
        company,
        documentName,
        source: 'DFX Web Form',
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to forward lead to CRM');
    }
    */
    
    console.log(`[Lead Captured] ${fullName} (${email}) downloaded ${documentName}`);

    // 5. Success
    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully' 
    });

  } catch (error) {
    console.error('Lead Generation API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
