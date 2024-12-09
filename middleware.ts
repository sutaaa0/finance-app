import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Jika ada token dan mencoba mengakses halaman welcome, alihkan ke home
  if (token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // Jika tidak ada token dan mengakses rute home atau dashboard, alihkan ke welcome
  const protectedRoutes = ['/home', '/dashboard']
  if (!token && protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/home/:path*', '/dashboard/:path*']
}