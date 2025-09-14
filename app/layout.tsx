import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { PageTransition } from "@/components/page-transition"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "OrbitX6 Space Operations Control",
  description: "Advanced space operations control interface powered by OrbitX6",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
