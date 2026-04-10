import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@900",
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((r) => r.text())

  const fontUrl = css.match(/src: url\((.+?)\) format/)?.[1]
  const font = fontUrl
    ? await fetch(fontUrl).then((r) => r.arrayBuffer())
    : null

  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF8F2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Montserrat",
          gap: 24,
        }}
      >
        {/* r logo circle */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "#FAF8F2",
            border: "3px solid #E8DFC8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: 80,
              color: "#efc374",
              lineHeight: 1,
              paddingBottom: 6,
            }}
          >
            r
          </span>
        </div>

        {/* wordmark */}
        <div
          style={{
            fontFamily: "Montserrat",
            fontWeight: 900,
            fontSize: 96,
            color: "#111111",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          ricordo
        </div>

        {/* url */}
        <div
          style={{
            fontFamily: "Montserrat",
            fontWeight: 900,
            fontSize: 28,
            color: "#888880",
            letterSpacing: "2px",
          }}
        >
          ricordosocial.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Montserrat", data: font, style: "normal", weight: 900 }]
        : [],
    }
  )
}
