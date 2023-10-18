import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
    }

    const isAdmin = token?.role === "ADMIN";
    const isUser = token?.role === "USER";
    const isStaff = token?.role === "STAFF";

    let role = isAdmin ? "admin" : isUser ? "user" : "staff";
    let path = req.nextUrl.pathname;

    if (path === "/") {
      return NextResponse.redirect(new URL(`/${role}`, req.nextUrl));
    } else if (path.startsWith(`/${role}`)) {
      return NextResponse.next();
    } else if (path.startsWith("/admin") || path.startsWith("/user")) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    } else {
      return NextResponse.redirect(new URL(`/${role}`, req.nextUrl));
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const isAdmin = token?.role === "ADMIN";
        const isUser = token?.role === "USER";
        const isStaff = token?.role === "STAFF";
        return isAdmin || isUser || isStaff;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/staff/:path*", "/"],
};
