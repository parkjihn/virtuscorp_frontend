"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    // Удаляем cookie аутентификации
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    // Перенаправляем на страницу входа
    router.push("/login")
    router.refresh()
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#0c1442] text-white flex items-center justify-center font-bold mr-2">
                  <span>VC</span>
                </div>
                <span className="text-lg font-semibold">VirtusCorp</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-[#0c1442] text-sm font-medium"
              >
                Главная
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Панель управления
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Профиль
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button
              variant="ghost"
              className="flex items-center text-gray-500 hover:text-gray-700"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Открыть меню</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-[#0c1442] text-base font-medium text-[#0c1442] bg-blue-50"
            >
              Главная
            </Link>
            <Link
              href="/dashboard"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Панель управления
            </Link>
            <Link
              href="/profile"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Профиль
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Выйти
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}