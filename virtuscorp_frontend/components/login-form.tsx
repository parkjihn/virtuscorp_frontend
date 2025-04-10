"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setDebugInfo("")

    try {
      // Для отладки: проверяем текущие куки перед запросом
      const currentCookies = document.cookie
      setDebugInfo((prev) => prev + `Current cookies before login: ${currentCookies}\n`)

      const response = await fetch("https://api.virtuscorp.site/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Важно для работы с куками
        body: JSON.stringify({ email, password }),
      })

      setDebugInfo((prev) => prev + `Response status: ${response.status}\n`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setDebugInfo((prev) => prev + `Response data: ${JSON.stringify(data)}\n`)

      if (data.access_token) {
        // Сохраняем токен в localStorage
        localStorage.setItem("auth-token", data.access_token)
        setDebugInfo((prev) => prev + `Token saved to localStorage\n`)

        // Также устанавливаем куки вручную на клиенте для дополнительной надежности
        document.cookie = `auth-token=${data.access_token}; path=/; SameSite=Lax;`
        setDebugInfo((prev) => prev + `Token saved to cookie\n`)

        // Проверяем куки после установки
        const afterCookies = document.cookie
        setDebugInfo((prev) => prev + `Cookies after login: ${afterCookies}\n`)

        // Добавляем токен в заголовки для всех последующих запросов
        if (typeof window !== "undefined") {
          // Устанавливаем токен в localStorage для использования в middleware
          window.localStorage.setItem("auth-token", data.access_token)
        }

        // Небольшая задержка перед редиректом
        setTimeout(() => {
          router.push("/dashboard")
          router.refresh()
        }, 1000)

        return
      } else {
        throw new Error("No access token received")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
        setDebugInfo((prev) => prev + `Error: ${err.message}\n`)
      } else {
        setError("Произошла неизвестная ошибка.")
        setDebugInfo((prev) => prev + `Unknown error\n`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full py-4 bg-white border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-center">
          <h1 className="text-2xl font-bold text-navy-900">Virtus Corp</h1>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Вход в систему</CardTitle>
            <CardDescription className="text-center">Войдите для доступа к вашему аккаунту</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
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
                  <Label htmlFor="remember" className="text-sm font-medium">
                    Запомнить меня
                  </Label>
                </div>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-[#0c1442] text-white">
                {isLoading ? "Вход..." : "Войти"}
              </Button>

              <div className="text-center mt-4">
                <span className="text-sm text-gray-600">Нет аккаунта? </span>
                <Link href="/sign-up" className="text-sm text-blue-800 hover:underline">
                  Регистрация
                </Link>
              </div>
            </form>

            {/* Отладочная информация (можно удалить в продакшене) */}
            {debugInfo && (
              <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs font-mono whitespace-pre-wrap">
                <p className="font-bold mb-2">Отладочная информация:</p>
                {debugInfo}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <footer className="py-4 text-center text-sm text-gray-500">© 2025 Virtus Corp</footer>
    </div>
  )
}

export default LoginForm
