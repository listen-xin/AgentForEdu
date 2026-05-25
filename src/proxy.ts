import { auth } from "@/lib/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (
    !req.auth &&
    (pathname.startsWith("/chat") || pathname.startsWith("/history"))
  ) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/chat", "/chat/:path*", "/history", "/history/:path*"],
};
