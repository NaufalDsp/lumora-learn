import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const roleRoutes = [
  { prefix: "/admin", roles: ["admin"] },
  { prefix: "/instructor", roles: ["admin", "instructor"] },
  { prefix: "/student", roles: ["admin", "student"] }
];

type SessionResponse = {
  user?: {
    role?: string;
    status?: string;
  };
};

export async function middleware(request: NextRequest) {
  const protectedRoute = roleRoutes.find((route) => request.nextUrl.pathname.startsWith(route.prefix));

  if (!protectedRoute) {
    return NextResponse.next();
  }

  const response = await fetch(new URL("/api/auth/get-session", request.url), {
    headers: {
      cookie: request.headers.get("cookie") ?? ""
    }
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const session = (await response.json()) as SessionResponse | null;
  const role = session?.user?.role;
  const status = session?.user?.status;

  if (!role || status === "inactive" || !protectedRoute.roles.includes(role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/instructor/:path*", "/student/:path*"]
};
