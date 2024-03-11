import { NextRequest, NextResponse } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

import { getCurrentUser } from "@/lib/auth"

export async function authMiddleware(req: NextRequest) {
  const res = NextResponse.next()

  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.redirect("/auth/signin")
  }

  return res
}

export async function supabaseMiddleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()

  return res
}

const middlewareConfig = {
  middleware: [
    {
      matcher: [
        "/dashboard",
        "/projects",
        "/tasks",
        "/messages",
        "/code",
        "/team",
        "/account",
      ],
      handler: authMiddleware,
    },
    {
      matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
      handler: supabaseMiddleware,
    },
  ],
}

export default middlewareConfig

