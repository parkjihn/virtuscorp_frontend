import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of paths that don't require authentication
const publicPaths = ["/login", "/sign-up", "/forgot-password"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is in the public paths list
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // Get the authentication token from cookies or localStorage (via header)
  const authToken = request.cookies.get("auth-token")?.value || request.headers.get("x-auth-token")

  console.log(`Middleware: Path=${pathname}, isPublicPath=${isPublicPath}, hasAuthToken=${!!authToken}`)

  // If the user is not authenticated and trying to access a protected route
  if (!authToken && !isPublicPath) {
    console.log("Middleware: Redirecting to login")
    // Redirect to the login page
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // If the user is authenticated and trying to access login or sign-up
  if (authToken && isPublicPath) {
    console.log("Middleware: Redirecting to dashboard")
    // Redirect to the dashboard
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  // Add the token from localStorage to the request headers if it exists
  const response = NextResponse.next()

  // Pass the token to the backend in a header for verification
  if (authToken) {
    response.headers.set("x-auth-token", authToken)
  }

  return response
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
