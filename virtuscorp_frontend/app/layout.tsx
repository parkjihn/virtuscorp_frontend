import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

// Preload fonts with proper subset for better performance
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Add display swap for better rendering
  preload: true,
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "VirtusCorp - Аналитика для маркетплейсов",
  description: "Аналитическая платформа для управления продажами на маркетплейсах",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Optimized script - using just a simple token check without excessive operations */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Simple and efficient check
                  const token = localStorage.getItem('auth-token');
                  if (token && !document.cookie.includes('auth-token=')) {
                    document.cookie = 'auth-token=' + token + '; path=/; max-age=86400; SameSite=Lax';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
