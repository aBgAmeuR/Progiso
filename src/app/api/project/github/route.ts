import vine from "@vinejs/vine"

import { getCurrentUser } from "@/lib/auth"
import { getSelectedProject } from "@/lib/project"
import { createSupabaseServerClient } from "@/lib/supabase"

import { linkGithubProjectSchema } from "./schema"
import { revalidatePath } from "next/cache"

// POST /api/project/github - link a project to a GitHub repository
export async function POST(req: Request) {
  const json = await req.json()

  const project = await vine.validate({
    schema: linkGithubProjectSchema,
    data: json,
  })

    const user = await getCurrentUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const selectedProject = await getSelectedProject()
  if (!selectedProject) {
    return new Response("Project not found", { status: 404 })
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("members")
    .select("role, user")
    .eq("project", selectedProject.id)
    .eq("user", user.id)
    .single()
    
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }

  if (!data) {
    return new Response("Unauthorized", { status: 401 })
  }

  if (data.role !== "admin") {
    return new Response("Unauthorized", { status: 401 })
  }

  const { error: updateError, data: updateData } = await supabase
    .from("projects")
    .update({ github_repo_url: project.project_name })
    .eq("id", selectedProject.id)
  
  console.log("updateData", updateData);
  console.log("selectedProject", selectedProject);
  
  if (updateError) {
    return new Response(JSON.stringify({ error: updateError.message }), {
      status: 500,
    })
  }

  return new Response(JSON.stringify({ message: "Project linked to GitHub" }), {
    status: 200,
  })
}
