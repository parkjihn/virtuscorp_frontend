import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        {/* Добавляем скрипт для проверки аутентификации */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Проверяем наличие токена в localStorage
                  const token = localStorage.getItem('auth-token');
                  if (token) {
                    // Если токен есть, устанавливаем его в куки
                    document.cookie = 'auth-token=' + token + '; path=/';
                  }
                } catch (e) {
                  console.error('Auth check error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
