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

    if (token.role === "ADMIN") {
      if (req.nextUrl.pathname === "/admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
      }
    } else {
      if (req.nextUrl.pathname === "/admin" && !token) {
        return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
      } else if (req.nextUrl.pathname === "/") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (req.nextUrl.pathname === "/admin") {
          return token?.role === "ADMIN";
        }
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/admin", "/"] };
