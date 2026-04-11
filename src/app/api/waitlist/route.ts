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
      <p style="font-size:22px;font-style:italic;color:#D4553A;margin-bottom:6px;">ricordo</p>
      <h2 style="font-size:18px;font-weight:600;color:#1E1A14;margin-bottom:24px;margin-top:0;">
        New Creator Waitlist Signup
      </h2>
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,0.06);">
        ${row("Name", `${data.firstName} ${data.lastName}`)}
        ${row("Email", `<a href="mailto:${data.email}" style="color:#D4553A;">${data.email}</a>`)}
        ${row("Instagram", data.instagram || "")}
        ${row("TikTok", data.tiktok || "")}
        ${row("Portfolio", data.portfolio ? `<a href="${data.portfolio}" style="color:#D4553A;">${data.portfolio}</a>` : "")}
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
      <p style="font-size:22px;font-style:italic;color:#D4553A;margin-bottom:6px;">ricordo</p>
      <h2 style="font-size:18px;font-weight:600;color:#1E1A14;margin-bottom:24px;margin-top:0;">
        New Business Waitlist Signup
      </h2>
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,0.06);">
        ${row("Business", data.businessName || "")}
        ${row("Email", `<a href="mailto:${data.email}" style="color:#D4553A;">${data.email}</a>`)}
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    const isCreator = type === "creator"

    const subject = isCreator
      ? `New Creator: ${data.firstName} ${data.lastName} — ${data.location}`
      : `New Business: ${data.businessName} — ${data.city}`

    const html = isCreator
      ? formatCreatorEmail(data)
      : formatBusinessEmail(data)

    const { error } = await resend.emails.send({
      from: "ricordo <no-reply@ricordosocial.com>",
      to: "tara@ricordosocial.com",
      subject,
      html,
    })

    if (error) throw new Error(error.message)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Waitlist email failed:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
