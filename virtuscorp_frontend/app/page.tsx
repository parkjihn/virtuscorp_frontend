import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-row min-h-screen bg-[#F5F7FA]">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <header className="w-full py-4 bg-[#ffff] shadow-md flex justify-between px-8">
          <h1 className="text-2xl font-bold text-[#1E293B]">Dashboard</h1>
          <nav></nav>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <h2 className="text-4xl font-semibold mb-4 text-[#1E293B]">Добро пожаловать в Virtus Corp</h2>
          <p className="text-lg text-gray-700 max-w-2xl">
            Мы предоставляем передовые аналитические решения для вашего бизнеса.
          </p>
          <Link href="/dashboard">
            <Button className="mt-6 px-6 py-3 hover:bg-[#0c1442]/90">Начать работу</Button>
          </Link>
        </main>

        <footer className="w-full py-4 bg-[#f0f0f6] shadow-md text-center">
          <p className="text-gray-600">&copy; 2025 Virtus Corp. Все права защищены.</p>
        </footer>
      </div>
    </div>
  )
}

export default HomePage

