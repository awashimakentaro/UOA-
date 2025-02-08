import { Noto_Serif_JP } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import type React from "react" // Import React

const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "アパート情報サイト",
  description: "学生向けアパート情報共有サービス",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={notoSerifJP.className}>
      <body>{children}</body>
    </html>
  )
}

