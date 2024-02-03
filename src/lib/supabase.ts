"use server"

import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

/**
 * @description Get the Supabase client
 * @warning This function should only be used in server-side code
 */
export async function createSupabaseServerClient() {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}
