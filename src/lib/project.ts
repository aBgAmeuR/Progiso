"use server"

import { revalidatePath } from "next/cache"

import { getCurrentUser } from "./auth"
import { createSupabaseServerClient } from "./supabase"

type Project = {
  created_at: string
  created_by: string
  description: string | null
  id: string
  image_url: string | null
  name: string
}

export const getSelectedProject = async (): Promise<Project | null> => {
  const user = await getCurrentUser()
  if (!user) {
    return null
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("selected_project(*)")
    .eq("id", user.id)
    .single()

  if (error) {
    console.error(error)
    return null
  }

  if (!data) {
    return null
  }

  return data.selected_project as unknown as Project
}

export const setSelectProject = async (projectId: string) => {
  const user = await getCurrentUser()
  if (!user) {
    return
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from("profiles")
    .update({ selected_project: projectId })
    .eq("id", user.id)

  if (error) {
    console.error(error)
  }

  revalidatePath("/")
}
