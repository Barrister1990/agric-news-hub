import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AgriNews & Research Hub",
  description: "Stay updated on the future of agriculture with the latest news, research, and insights.",
  generator: "Charles Awuku",
  metadataBase: new URL("https://agric-news-hub.vercel.app"), // replace with your actual domain
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "AgriNews & Research Hub",
    description: "Stay updated on the future of agriculture with the latest news, research, and insights.",
    url: "https://agric-news-hub.vercel.app",
    siteName: "AgriNews & Research Hub",
    images: [
      {
        url: "/og-image.png", // Place this image in /public folder
        width: 1200,
        height: 630,
        alt: "AgriNews Preview Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgriNews & Research Hub",
    description: "Explore agriculture's future — news, research, and more.",
    images: ["/og-image.png"],
    creator: "@your_twitter_handle", // optional
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}