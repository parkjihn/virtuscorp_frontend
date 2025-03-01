import type React from "react"
import Navbar from "@/components/navbar"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
    </>
  )
}

