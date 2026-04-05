import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans, Montserrat, Great_Vibes } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

const montserrat = Montserrat({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["900"],
})

const greatVibes = Great_Vibes({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "ricordo — local businesses + local content creators",
  description:
    "A marketplace connecting local content creators with local businesses for short-form video content.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${montserrat.variable} ${greatVibes.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
