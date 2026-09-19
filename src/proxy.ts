import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const protectedPages = ["/cart", "/wishList"];
  const authPages = ["/login", "/register"];

  const pathname = req.nextUrl.pathname;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const accessToken = token?.token;

  // User is not logged in → protected page
  if (
    !accessToken &&
    protectedPages.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // User is already logged in → login/register
  if (accessToken && authPages.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/wishList/:path*", "/login", "/register"],
};

// export const config = {
//   matcher: [ "/login", "/register"],
// };
