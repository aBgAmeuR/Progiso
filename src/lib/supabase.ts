"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { Database } from "@/types/database"

/**
 * @description Get the Supabase client
 * @warning This function should only be used in server-side code
 */
export async function createSupabaseServerClient() {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}
