import { createSupabaseServerClient } from "@/lib/supabase"

export type Project = {
  name: string
  description?: string
  image_url?: string
}

export const createProject = async (project: Project) => {
  const supabase = await createSupabaseServerClient()

  return supabase.from("projects").insert([project])
}
