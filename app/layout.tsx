import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EchoClime - Environmental Data Storytelling",
  description:
    "Transform complex climate data into compelling visual narratives. Monitor, analyze, and share environmental insights across India.",
  generator: "EchoClime",
  keywords: [
    "climate data",
    "environmental monitoring",
    "data visualization",
    "sustainability",
    "climate change",
    "carbon tracking",
  ],
  authors: [{ name: "EchoClime Team" }],
  openGraph: {
    title: "EchoClime - Environmental Data Storytelling",
    description: "Transform complex climate data into compelling visual narratives.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoClime - Environmental Data Storytelling",
    description: "Transform complex climate data into compelling visual narratives.",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#22c55e" },
    { media: "(prefers-color-scheme: dark)", color: "#16a34a" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
