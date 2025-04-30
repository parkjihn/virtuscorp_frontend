// middleware.ts - Optimized version

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of paths that don't require authentication
const publicPaths = ["/login", "/sign-up", "/forgot-password"]

// Cache for authentication results to prevent redundant checks
const authCache = new Map<string, number>() // path -> timestamp

// Cache expiry in milliseconds (30 seconds)
const CACHE_EXPIRY = 30000

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the path is in the public paths list
  const isPublicPath = publicPaths.some((path) => 
    pathname === path || pathname.startsWith(`${path}/`)
  )

  // Skip middleware for static assets, API calls that don't need auth
  if (
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/api/public/') ||
    pathname.includes('.') // Files with extensions
  ) {
    return NextResponse.next()
  }

  // Check cache to avoid redundant auth checks
  const cacheKey = `${pathname}-${isPublicPath}`
  const cachedResult = authCache.get(cacheKey)
  const now = Date.now()
  
  if (cachedResult && now - cachedResult < CACHE_EXPIRY) {
    // Use cached result if it's still valid
    return NextResponse.next()
  }

  // Get the authentication token from cookies
  const authToken = request.cookies.get("auth-token")?.value

  // If no token in cookies, try to get from headers (for API requests)
  const headerToken = request.headers.get("x-auth-token")

  // Use either cookie token or header token
  const token = authToken || headerToken

  // If the user is not authenticated and trying to access a protected route
  if (!token && !isPublicPath) {
    // Redirect to the login page
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // If the user is authenticated and trying to access login or sign-up
  if (token && isPublicPath) {
    // Redirect to the dashboard
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  // Add the token from cookies to the request headers if it exists
  const response = NextResponse.next()

  // Pass the token to the backend in a header for verification
  if (token) {
    response.headers.set("x-auth-token", token)
  }

  // Update cache with current timestamp
  authCache.set(cacheKey, now)
  
  // Clean up expired cache entries periodically
  if (Math.random() < 0.01) { // 1% chance to clean up on each request
    for (const [key, timestamp] of authCache.entries()) {
      if (now - timestamp > CACHE_EXPIRY) {
        authCache.delete(key)
      }
    }
  }

  return response
}

// Configure the middleware to run only on specific paths that need authentication
export const config = {
  matcher: [
    // Exclude static files
    "/((?!_next/static|_next/image|favicon.ico|public|api/public).*)",
  ],
}
