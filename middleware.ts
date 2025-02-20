import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/tournaments/create']
  
  if (protectedRoutes.includes(req.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect logged in users from auth pages
  const authRoutes = ['/login', '/reset-password']
  if (authRoutes.includes(req.nextUrl.pathname) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/tournaments/create', '/login', '/reset-password'],
}