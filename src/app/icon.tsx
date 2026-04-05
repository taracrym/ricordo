import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default async function Icon() {
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
          background: "#F0EAD8",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Montserrat",
          fontWeight: 900,
          fontSize: 28,
          color: "#EFC374",
          paddingBottom: 2,
          paddingLeft: 1,
        }}
      >
        r
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
