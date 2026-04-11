import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

function formatCreatorEmail(data: Record<string, string>): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 14px;border-bottom:1px solid #f0ebe0;color:#7A7060;font-size:13px;width:38%;white-space:nowrap;">${label}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f0ebe0;font-size:13px;color:#1E1A14;">${value}</td>
        </tr>`
      : ""

  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 20px;background:#FEFEF8;">
      <p style="font-size:22px;font-weight:900;color:#efc374;margin-bottom:6px;letter-spacing:-0.04em;">ricordo</p>
      <h2 style="font-size:18px;font-weight:600;color:#1E1A14;margin-bottom:24px;margin-top:0;">
        New Creator Waitlist Signup
      </h2>
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,0.06);">
        ${row("Name", `${data.firstName} ${data.lastName}`)}
        ${row("Email", `<a href="mailto:${data.email}" style="color:#efc374;">${data.email}</a>`)}
        ${row("Instagram", data.instagram || "")}
        ${row("TikTok", data.tiktok || "")}
        ${row("Portfolio", data.portfolio ? `<a href="${data.portfolio}" style="color:#efc374;">${data.portfolio}</a>` : "")}
        ${row("Content Niches", data.niches || "")}
        ${row("City", data.location || "")}
        ${row("Rate", data.rate || "")}
        ${row("Availability", data.availability ? `${data.availability}` : "")}
        ${row("Notes", data.notes || "")}
      </table>
      <p style="font-size:11px;color:#B0A898;margin-top:24px;text-align:center;">
        Submitted via ricordosocial.com
      </p>
    </div>
  `
}

function formatBusinessEmail(data: Record<string, string>): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 14px;border-bottom:1px solid #f0ebe0;color:#7A7060;font-size:13px;width:38%;white-space:nowrap;">${label}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f0ebe0;font-size:13px;color:#1E1A14;">${value}</td>
        </tr>`
      : ""

  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 20px;background:#FEFEF8;">
      <p style="font-size:22px;font-weight:900;color:#efc374;margin-bottom:6px;letter-spacing:-0.04em;">ricordo</p>
      <h2 style="font-size:18px;font-weight:600;color:#1E1A14;margin-bottom:24px;margin-top:0;">
        New Business Waitlist Signup
      </h2>
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,0.06);">
        ${row("Business", data.businessName || "")}
        ${row("Email", `<a href="mailto:${data.email}" style="color:#efc374;">${data.email}</a>`)}
        ${row("City", data.city || "")}
        ${row("Monthly Budget", data.budget || "")}
        ${row("Content Frequency", data.frequency || "")}
        ${row("Looking For", data.description || "")}
      </table>
      <p style="font-size:11px;color:#B0A898;margin-top:24px;text-align:center;">
        Submitted via ricordosocial.com
      </p>
    </div>
  `
}

function creatorWelcomeEmail(data: Record<string, string>): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#FAF8F2;">

      <!-- Header -->
      <div style="background:#efc374;padding:40px 40px 32px;text-align:center;">
        <p style="font-size:36px;font-weight:900;color:#111111;margin:0;letter-spacing:-0.04em;line-height:1;">ricordo</p>
        <p style="font-size:13px;color:#111111;margin:8px 0 0;letter-spacing:0.08em;text-transform:uppercase;opacity:0.7;">local content creators + local businesses</p>
      </div>

      <!-- Body -->
      <div style="padding:40px;">
        <h1 style="font-size:24px;font-weight:700;color:#111111;margin:0 0 16px;line-height:1.2;">
          you're on the list, ${data.firstName}.
        </h1>
        <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 24px;">
          Welcome to ricordo — we're building something we think you're going to love.
          We're pairing local content creators with local businesses so you can get paid
          doing what you already do: filming great content.
        </p>

        <!-- Highlight box -->
        <div style="background:#FBF5E8;border-left:3px solid #efc374;padding:20px 24px;margin:0 0 28px;border-radius:0 8px 8px 0;">
          <p style="font-size:15px;font-weight:600;color:#111111;margin:0 0 8px;">when we launch in your area:</p>
          <ul style="font-size:14px;color:#444;line-height:1.8;margin:0;padding-left:18px;">
            <li>You'll be matched with local businesses that fit your niche</li>
            <li>You'll film on-location with a shot list built for Reels + TikTok</li>
            <li>You'll get paid — no agencies, no middlemen</li>
          </ul>
        </div>

        <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 32px;">
          We'll reach out personally when we launch in <strong>${data.location || "your city"}</strong>.
          In the meantime, follow us on Instagram for updates.
        </p>

        <!-- CTA -->
        <div style="text-align:center;margin-bottom:32px;">
          <a href="https://instagram.com/ricordosocial"
             style="display:inline-block;background:#efc374;color:#111111;font-weight:700;font-size:12px;
                    letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;
                    padding:14px 32px;">
            Follow @ricordosocial
          </a>
        </div>

        <p style="font-size:14px;color:#888;line-height:1.7;margin:0;">
          Can't wait to have you in the network.<br/>
          — Tara, founder of ricordo
        </p>
      </div>

      <!-- Footer -->
      <div style="border-top:1px solid #E8DFC8;padding:20px 40px;text-align:center;">
        <p style="font-size:11px;color:#B0A898;margin:0;">
          ricordosocial.com · you're receiving this because you joined our waitlist
        </p>
      </div>

    </div>
  `
}

function businessWelcomeEmail(data: Record<string, string>): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#FAF8F2;">

      <!-- Header -->
      <div style="background:#efc374;padding:40px 40px 32px;text-align:center;">
        <p style="font-size:36px;font-weight:900;color:#111111;margin:0;letter-spacing:-0.04em;line-height:1;">ricordo</p>
        <p style="font-size:13px;color:#111111;margin:8px 0 0;letter-spacing:0.08em;text-transform:uppercase;opacity:0.7;">local content creators + local businesses</p>
      </div>

      <!-- Body -->
      <div style="padding:40px;">
        <h1 style="font-size:24px;font-weight:700;color:#111111;margin:0 0 16px;line-height:1.2;">
          welcome to the network, ${data.businessName}.
        </h1>
        <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 24px;">
          You're on the list — and we're glad you're here. ricordo connects local businesses
          like yours with creators who actually know your city and can tell your story on camera.
          No agencies. No contracts. Just content that works.
        </p>

        <!-- Highlight box -->
        <div style="background:#FBF5E8;border-left:3px solid #efc374;padding:20px 24px;margin:0 0 28px;border-radius:0 8px 8px 0;">
          <p style="font-size:15px;font-weight:600;color:#111111;margin:0 0 8px;">when we launch in your area:</p>
          <ul style="font-size:14px;color:#444;line-height:1.8;margin:0;padding-left:18px;">
            <li>Local creators will pitch you content ideas tailored to your business</li>
            <li>You'll get edited videos, captions, and raw clips — ready to post</li>
            <li>Delivered within 48 hours of the shoot</li>
          </ul>
        </div>

        <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 32px;">
          We'll be in touch when we launch in <strong>${data.city || "your city"}</strong>.
          Follow us on Instagram to stay in the loop before then.
        </p>

        <!-- CTA -->
        <div style="text-align:center;margin-bottom:32px;">
          <a href="https://instagram.com/ricordosocial"
             style="display:inline-block;background:#efc374;color:#111111;font-weight:700;font-size:12px;
                    letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;
                    padding:14px 32px;">
            Follow @ricordosocial
          </a>
        </div>

        <p style="font-size:14px;color:#888;line-height:1.7;margin:0;">
          Excited to work with you.<br/>
          — Tara, founder of ricordo
        </p>
      </div>

      <!-- Footer -->
      <div style="border-top:1px solid #E8DFC8;padding:20px 40px;text-align:center;">
        <p style="font-size:11px;color:#B0A898;margin:0;">
          ricordosocial.com · you're receiving this because you joined our waitlist
        </p>
      </div>

    </div>
  `
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    const isCreator = type === "creator"

    // Email to Tara
    const adminSubject = isCreator
      ? `New Creator: ${data.firstName} ${data.lastName} — ${data.location}`
      : `New Business: ${data.businessName} — ${data.city}`

    const adminHtml = isCreator
      ? formatCreatorEmail(data)
      : formatBusinessEmail(data)

    const { error: adminError } = await resend.emails.send({
      from: "ricordo <no-reply@ricordosocial.com>",
      to: "tara@ricordosocial.com",
      subject: adminSubject,
      html: adminHtml,
    })

    if (adminError) throw new Error(adminError.message)

    // Welcome email to the person who signed up
    const welcomeSubject = isCreator
      ? "you're on the list 🎬"
      : "welcome to the network ✨"

    const welcomeHtml = isCreator
      ? creatorWelcomeEmail(data)
      : businessWelcomeEmail(data)

    await resend.emails.send({
      from: "Tara at ricordo <tara@ricordosocial.com>",
      to: data.email,
      subject: welcomeSubject,
      html: welcomeHtml,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Waitlist email failed:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
