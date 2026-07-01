import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    const { fullName, email, company, documentName, turnstileToken, country, message } = body;

    // 2. Basic Validation
    if (!fullName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2.5 Cloudflare Turnstile Verification
    if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const formData = new FormData();
      formData.append('secret', process.env.TURNSTILE_SECRET_KEY);
      formData.append('response', turnstileToken);

      const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });
      const turnstileData = await turnstileRes.json();
      if (!turnstileData.success) {
        console.warn('Turnstile verification failed', turnstileData);
        return NextResponse.json({ error: 'Captcha verification failed. Please try again.' }, { status: 403 });
      }
    } else if (process.env.TURNSTILE_SECRET_KEY) {
      // If secret is set but no token is provided, fail the request
      return NextResponse.json({ error: 'Captcha token missing' }, { status: 403 });
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
      const resend = new Resend(RESEND_API_KEY);
      
      promises.push(
        (async () => {
          // 1. Send internal notification
          await resend.emails.send({
            from: 'DataFlowX Website <leads@dataflowx.com>',
            to: ['info@dataflowx.com'],
            subject: `🚨 New Lead: ${fullName} / ${company} / ${country || 'N/A'}`,
            html: `
              <h2>New Lead Captured!</h2>
              <p><strong>Source:</strong> ${documentName}</p>
              <ul>
                <li><strong>Name:</strong> ${fullName}</li>
                <li><strong>Company:</strong> ${company}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Country:</strong> ${country || 'N/A'}</li>
                <li><strong>Time:</strong> ${new Date().toUTCString()}</li>
              </ul>
              ${message ? `<h3>Message:</h3><p>${message}</p>` : ''}
            `
          });

          // 2. Send auto-reply to the user (Requires verified domain to send to arbitrary addresses)
          // Note: If onboarding@resend.dev is used, it can only send to verified emails (like info@dataflowx.com).
          // You must verify dataflowx.com in Resend to enable this auto-reply to the user's 'email'.
          try {
            await resend.emails.send({
              from: 'DataFlowX <noreply@dataflowx.com>',
              to: email,
              subject: 'DataFlowX — We received your request',
              html: `<p>Hi ${fullName},</p><p>Thank you for reaching out to DataFlowX. We have received your request and our team will get back to you shortly.</p>`
            });
          } catch (autoReplyErr) {
            console.error('Auto-reply failed (Domain likely not verified):', autoReplyErr);
          }
        })()
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
