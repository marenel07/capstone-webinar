import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    }

    const isAdmin = token?.role === 'ADMIN';
    const isUser = token?.role === 'USER';

    if (isAdmin && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    } else if (isUser && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/user', req.nextUrl));
    } else if (isAdmin && req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.next();
    } else if (isUser && req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    } else if (isUser && req.nextUrl.pathname.startsWith('/user')) {
      return NextResponse.next();
    } else if (isAdmin && req.nextUrl.pathname.startsWith('/user')) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    } else {
      return NextResponse.redirect(
        new URL(`/${isAdmin ? 'admin' : 'user'}`, req.nextUrl)
      );
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const isAdmin = token?.role === 'ADMIN';
        const isUser = token?.role === 'USER';
        return isAdmin || isUser;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/'],
};
