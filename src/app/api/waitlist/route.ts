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
        ${row("Contact", `${data.firstName || ""} ${data.lastName || ""}`.trim())}
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
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:48px 32px;background:#ffffff;">
      <p style="font-size:20px;font-weight:900;color:#efc374;margin:0 0 32px;letter-spacing:-0.02em;font-family:system-ui,sans-serif;">ricordo</p>

      <p style="font-size:16px;color:#111;line-height:1.7;margin:0 0 20px;">
        Hi ${data.firstName},
      </p>
      <p style="font-size:16px;color:#111;line-height:1.7;margin:0 0 20px;">
        You're on the list — and I'm genuinely excited you're here.
      </p>
      <p style="font-size:16px;color:#111;line-height:1.7;margin:0 0 20px;">
        ricordo is a platform I'm building to connect local content creators with local businesses
        that need short-form video. The idea is simple: you film, you get paid, the business gets
        content that actually works.
      </p>
      <p style="font-size:16px;color:#111;line-height:1.7;margin:0 0 20px;">
        When we launch in ${data.location || "your city"}, I'll reach out personally to match you
        with businesses in your area that fit your niche. You'll get a shot list, show up, film —
        and the rest is handled.
      </p>
      <p style="font-size:16px;color:#111;line-height:1.7;margin:0 0 32px;">
        In the meantime, follow along at
        <a href="https://instagram.com/ricordosocial" style="color:#efc374;text-decoration:none;">@ricordosocial</a>
        — I'll be sharing updates there first.
      </p>
      <p style="font-size:16px;color:#111;line-height:1.7;margin:0;">
        Talk soon,<br/>
        <strong>Tara</strong><br/>
        <span style="color:#888;font-size:14px;">founder, ricordo</span>
      </p>

      <p style="font-size:12px;color:#bbb;margin-top:48px;border-top:1px solid #f0ebe0;padding-top:20px;">
        ricordosocial.com — you're receiving this because you joined our waitlist
      </p>
    </div>
  `
}

function businessWelcomeEmail(data: Record<string, string>): string {
  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:48px 32px;background:#ffffff;">
      <p style="font-size:20px;font-weight:900;color:#efc374;margin:0 0 32px;letter-spacing:-0.02em;font-family:system-ui,sans-serif;">ricordo</p>

      <p style="font-size:16px;color:#111;line-height:1.7;margin:0 0 20px;">
        Hi ${data.firstName || data.businessName},
      </p>
      <p style="font-size:16px;color:#111;line-height:1.7;margin:0 0 20px;">
        You're on the list — thank you for signing up.
      </p>
      <p style="font-size:16px;color:#111;line-height:1.7;margin:0 0 20px;">
        ricordo is a platform connecting local businesses with local content creators for
        short-form video. Think of it as having a creator on call who actually knows your city,
        understands your brand, and delivers content you can post the same week — without the
        agency price tag.
      </p>
      <p style="font-size:16px;color:#111;line-height:1.7;margin:0 0 20px;">
        When we launch in ${data.city || "your city"}, you'll start receiving content pitches from
        vetted local creators. You pick who you want to work with, book a shoot, and get edited
        videos, captions, and raw clips delivered within 48 hours. No contracts, no long-term commitment.
      </p>
      <p style="font-size:16px;color:#111;line-height:1.7;margin:0 0 32px;">
        Follow us at
        <a href="https://instagram.com/ricordosocial" style="color:#efc374;text-decoration:none;">@ricordosocial</a>
        for updates in the meantime.
      </p>
      <p style="font-size:16px;color:#111;line-height:1.7;margin:0;">
        Looking forward to working with you,<br/>
        <strong>Tara</strong><br/>
        <span style="color:#888;font-size:14px;">founder, ricordo</span>
      </p>

      <p style="font-size:12px;color:#bbb;margin-top:48px;border-top:1px solid #f0ebe0;padding-top:20px;">
        ricordosocial.com — you're receiving this because you joined our waitlist
      </p>
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
      ? "you're on the list"
      : "welcome to the network"

    const welcomeHtml = isCreator
      ? creatorWelcomeEmail(data)
      : businessWelcomeEmail(data)

    const { error: welcomeError } = await resend.emails.send({
      from: "Tara at ricordo <no-reply@ricordosocial.com>",
      to: data.email,
      subject: welcomeSubject,
      html: welcomeHtml,
    })

    if (welcomeError) console.error("Welcome email failed:", welcomeError)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Waitlist email failed:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
