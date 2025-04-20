import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';
  const token = request.cookies.get('token')?.value || '';

  // If logged in, prevent access to public routes
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // If NOT logged in, prevent access to protected routes
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // ✅ Always return NextResponse.next() if no redirect happens
  return NextResponse.next();
}

// Matching paths for middleware
export const config = {
  matcher: ['/', '/profile', '/login', '/signup'],
};
