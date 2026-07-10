import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateDownloadToken } from '@/lib/download-token';

const SANITY_CDN_PREFIX = 'https://cdn.sanity.io/';

async function syncToHubSpot(data: {
  email: string;
  fullName: string;
  company: string;
  documentName?: string;
  token: string;
}): Promise<void> {
  const headers = {
    Authorization: `Bearer ${data.token}`,
    'Content-Type': 'application/json',
  };

  const [firstName, ...rest] = data.fullName.trim().split(' ');
  const lastName = rest.join(' ') || '-';

  // Create contact; if exists (409) fetch and patch instead
  const createRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      properties: {
        email: data.email,
        firstname: firstName,
        lastname: lastName,
        company: data.company,
        hs_lead_status: 'NEW',
      },
    }),
  });

  let contactId: string | undefined;

  if (createRes.ok) {
    contactId = (await createRes.json()).id;
  } else if (createRes.status === 409) {
    const findRes = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(data.email)}?idProperty=email`,
      { headers }
    );
    if (findRes.ok) {
      const existing = await findRes.json();
      contactId = existing.id;
      if (data.company) {
        await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ properties: { company: data.company } }),
        });
      }
    }
  } else {
    console.error('[HubSpot] Contact creation failed:', await createRes.text());
    return;
  }

  // Add a timeline note with the downloaded document name
  if (contactId && data.documentName) {
    await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        properties: {
          hs_note_body: `Downloaded: ${data.documentName}`,
          hs_timestamp: new Date().toISOString(),
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
          },
        ],
      }),
    });
  }
}

const HONEYPOT_FIELD = 'website_url';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Honeypot check (Bot detection)
    if (body[HONEYPOT_FIELD]) {
      console.warn('Bot detected via honeypot');
      // Silently return 200 so bots think they succeeded
      return NextResponse.json({ success: true, message: 'Received' }, { status: 200 });
    }

    const { fullName, email, company, documentName, fileUrl, turnstileToken, country, message } = body;

    // Validate fileUrl is a Sanity CDN URL (prevent open-proxy abuse)
    if (fileUrl && !String(fileUrl).startsWith(SANITY_CDN_PREFIX)) {
      return NextResponse.json({ error: 'Invalid file URL' }, { status: 400 });
    }

    // 2. Basic Validation
    if (!fullName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (
      fullName.length > 100 ||
      email.length > 200 ||
      (company && company.length > 200) ||
      (message && message.length > 2000) ||
      (documentName && documentName.length > 300)
    ) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
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

      try {
        // 1. Internal notification to sales team
        await resend.emails.send({
          from: 'DataFlowX Website <leads@dataflowx.com>',
          to: ['info@dataflowx.com'],
          subject: `New Lead: ${escapeHtml(fullName)} / ${escapeHtml(company ?? '')} / ${escapeHtml(country || 'N/A')}`,
          html: `
            <h2>New Lead Captured!</h2>
            <p><strong>Source:</strong> ${escapeHtml(documentName ?? '')}</p>
            <ul>
              <li><strong>Name:</strong> ${escapeHtml(fullName)}</li>
              <li><strong>Company:</strong> ${escapeHtml(company ?? '')}</li>
              <li><strong>Email:</strong> ${escapeHtml(email)}</li>
              <li><strong>Country:</strong> ${escapeHtml(country || 'N/A')}</li>
              <li><strong>Time:</strong> ${new Date().toUTCString()}</li>
            </ul>
            ${message ? `<h3>Message:</h3><p>${escapeHtml(message)}</p>` : ''}
          `
        });

        // 2. Auto-reply to the user (requires verified domain in Resend)
        try {
          await resend.emails.send({
            from: 'DataFlowX <noreply@dataflowx.com>',
            to: email,
            subject: 'DataFlowX — We received your request',
            html: `<p>Hi ${escapeHtml(fullName)},</p><p>Thank you for reaching out to DataFlowX. We have received your request and our team will get back to you shortly.</p>`
          });
        } catch (autoReplyErr) {
          console.error('Auto-reply failed (domain likely not verified in Resend):', autoReplyErr);
        }
      } catch (emailErr) {
        console.error('Resend email failed:', emailErr);
      }
    } else {
      console.warn('RESEND_API_KEY is not set. Email notification skipped.');
    }
    
    console.log(`[Lead Captured] ${fullName} from ${company} (${email}) downloaded ${documentName}`);

    // 4b. HubSpot CRM sync (non-blocking — failure doesn't affect lead capture)
    if (process.env.HUBSPOT_ACCESS_TOKEN) {
      syncToHubSpot({
        email,
        fullName,
        company: company ?? '',
        documentName,
        token: process.env.HUBSPOT_ACCESS_TOKEN,
      }).catch((err) => console.error('[HubSpot] Sync error:', err));
    }

    // 5. Generate a short-lived signed download token
    let downloadToken: string | null = null;
    if (fileUrl && process.env.DOWNLOAD_SECRET) {
      downloadToken = await generateDownloadToken(String(fileUrl), process.env.DOWNLOAD_SECRET);
    }

    return NextResponse.json({ success: true, downloadToken });

  } catch (error) {
    console.error('Lead Generation API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
