"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // В реальном приложении здесь будет запрос к API для аутентификации
      // Для демонстрации просто имитируем успешный вход
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Устанавливаем cookie для аутентификации
      document.cookie = `auth-token=demo-token; path=/; max-age=${rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60}`

      // Перенаправляем на главную страницу
      router.push("/")
      router.refresh()

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <VirtusLogo />
        </div>
        <CardTitle className="text-2xl font-bold text-center">Вход в систему</CardTitle>
        <CardDescription className="text-center">Войдите для доступа к вашему аккаунту</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Введите ваш email</Label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Введите ваш пароль</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="****************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Скрыть пароль" : "Показать пароль"}</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLoading}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Запомнить меня
              </Label>
            </div>
            <Link href="/forgot-password" className="text-sm text-blue-800 hover:underline">
              Забыли пароль?
            </Link>
          </div>
          <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900" disabled={isLoading}>
            {isLoading ? "Вход..." : "Войти"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function VirtusLogo() {
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-800 text-white font-bold text-xl">
      <span>VC</span>
    </div>
  )
}

