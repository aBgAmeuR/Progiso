import vine from "@vinejs/vine"

export const createProjectSchema = vine.object({
  name: vine.string(),
  description: vine.string().optional(),
  image_url: vine.string().url().optional(),
})
