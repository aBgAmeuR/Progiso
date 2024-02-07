import vine from "@vinejs/vine"

import { getCurrentUser } from "@/lib/auth"
import { createSupabaseServerClient } from "@/lib/supabase"

import { createProjectSchema } from "./schema"

// POST /api/project - creates a new project
export async function POST(req: Request) {
  const json = await req.json()

  const project = await vine.validate({
    schema: createProjectSchema,
    data: json,
  })

  const user = await getCurrentUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.from("projects").insert({ ...project })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }

  return new Response(JSON.stringify({ message: "Project created" }), {
    status: 201,
  })
}
