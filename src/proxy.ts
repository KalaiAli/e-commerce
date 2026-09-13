import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(req: NextRequest) {
  const protectedPage = ["/cart", "/wishList"];
  const authPage = ["/login", "/register"];

  const pathName = req.nextUrl.pathname;
  // get token
  const myToken = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const acessToken = myToken?.token;

  if (!acessToken && protectedPage.some((path) => pathName.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (acessToken && authPage.some((path) => pathName.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
//  make the proxy work only for the page ypu need 
//  catch all segment   example  /cart/id/test      id and test called segment

export const config = {
  matcher: ["/cart/:path*", "/wishList/:path*", "/login", "/register"],
};
