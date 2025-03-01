import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Функция для проверки, аутентифицирован ли пользователь
// В будущем здесь можно реализовать проверку JWT токена
function isAuthenticated(request: NextRequest) {
  // Проверяем наличие cookie с токеном аутентификации
  const authToken = request.cookies.get("auth-token")?.value
  return !!authToken
}

export function middleware(request: NextRequest) {
  // Получаем текущий путь
  const path = request.nextUrl.pathname

  // Если пользователь не аутентифицирован и пытается получить доступ к защищенным маршрутам
  if (!isAuthenticated(request) && path !== "/login") {
    // Перенаправляем на страницу входа
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Если пользователь уже аутентифицирован и пытается получить доступ к странице входа
  if (isAuthenticated(request) && path === "/login") {
    // Перенаправляем на главную страницу
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Указываем, для каких путей будет применяться middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

