import { get } from "http"
import { NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/auth"

export async function authMiddleware(req: NextRequest) {
  const res = NextResponse.next()

  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.redirect("/auth/signin")
  }

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
  ],
}

export default middlewareConfig
