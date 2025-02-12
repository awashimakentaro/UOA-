import "./globals.css"
import type { Metadata } from "next"
import { Providers } from "@/components/Providers"
import type React from "react" // Added import for React

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
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

