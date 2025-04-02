"use client"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
  
    try {
      const response = await fetch("https://api.virtuscorp.site/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      })
  
      if (response.ok) {
       
        router.push("/") 
        router.refresh()
        return
      }
  
      const data = await response.json()
      throw new Error(data.detail || "Ошибка входа")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Произошла неизвестная ошибка.")
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
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
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
                  <Label htmlFor="remember" className="text-sm font-medium">
                    Запомнить меня
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-blue-800 hover:underline">
                  Забыли пароль?
                </Link>
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
          </CardContent>
        </Card>
      </div>

      <footer className="py-4 text-center text-sm text-gray-500">© 2025 Virtus Corp</footer>
    </div>
  )
}

export default LoginForm
