"use server"

import { createSupabaseServerClient } from "@/lib/supabase"

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.getUser()
  return error ? null : data.user
}

export async function getCurrentSession() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.getSession()
  return error ? null : data.session
}
