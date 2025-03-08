import type React from "react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

