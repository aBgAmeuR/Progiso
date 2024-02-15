import vine from "@vinejs/vine"

export const linkGithubProjectSchema = vine.object({
  project_name: vine.string(),
})
