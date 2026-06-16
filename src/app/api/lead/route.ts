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

    // 4. Send to Sales Team (Email via Resend) & WP Engine (Webhook)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const WP_WEBHOOK_URL = process.env.WP_LEAD_WEBHOOK;
    
    // We run both tasks in parallel using Promise.allSettled
    // so if one fails, the other can still succeed.
    const promises = [];

    // Task A: Email via Resend
    if (RESEND_API_KEY) {
      promises.push(
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${RESEND_API_KEY}`
          },
          body: JSON.stringify({
            // Alan adınız henüz doğrulanmadığı için Resend'in test e-postasını kullanıyoruz
            from: 'DataFlowX Website <onboarding@resend.dev>',
            to: ['info@dataflowx.com'],
            subject: `🚨 New Lead: ${fullName} downloaded ${documentName}`,
            html: `
              <h2>New Lead Captured!</h2>
              <p>A user has just downloaded the <strong>${documentName}</strong>.</p>
              <ul>
                <li><strong>Name:</strong> ${fullName}</li>
                <li><strong>Company:</strong> ${company}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Time:</strong> ${new Date().toUTCString()}</li>
              </ul>
            `
          })
        }).then(async (res) => {
          if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Resend API failed: ${errText}`);
          }
        })
      );
    } else {
      console.warn('RESEND_API_KEY is not set. Email notification skipped.');
    }

    // Task B: Webhook to WordPress (e.g., Contact Form 7 / Gravity Forms)
    if (WP_WEBHOOK_URL) {
      // Contact Form 7 (CF7) strictly requires FormData, not JSON.
      const formData = new FormData();
      formData.append('your-name', fullName);
      formData.append('your-email', email);
      formData.append('your-company', company);
      formData.append('document-name', documentName || '');
      // CF7 sometimes requires the _wpcf7 field to be present
      formData.append('_wpcf7', '363');
      // CF7 STRICTLY requires a unit tag to be present, otherwise it throws 'wpcf7_unit_tag_not_found'
      formData.append('_wpcf7_unit_tag', 'wpcf7-f363-p1-o1');

      promises.push(
        fetch(WP_WEBHOOK_URL, {
          method: 'POST',
          // Do NOT set Content-Type header manually when using FormData
          // fetch will automatically set it to multipart/form-data with the correct boundary
          body: formData,
        }).then(async (res) => {
          if (!res.ok) {
            const errText = await res.text();
            throw new Error(`WP Webhook failed: ${errText}`);
          }
        })
      );
    } else {
      console.warn('WP_LEAD_WEBHOOK is not set. WordPress sync skipped.');
    }

    // Execute both parallel tasks
    const results = await Promise.allSettled(promises);
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Task ${index} failed:`, result.reason);
      }
    });
    
    console.log(`[Lead Captured] ${fullName} from ${company} (${email}) downloaded ${documentName}`);

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
