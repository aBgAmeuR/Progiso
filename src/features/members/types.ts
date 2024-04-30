import { z } from 'zod';

export type TMember = {
  id: string;
  name: string;
  image: string;
  role: string;
};

export type TMembers = Array<TMember>;

const ORDER_ENUM = ['asc', 'desc'] as const;

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  role: z.string().optional(),
  name: z.string().optional(),
  order_role: z.enum(ORDER_ENUM).optional(),
  order_name: z.enum(ORDER_ENUM).optional(),
});

export const getTasksSchema = searchParamsSchema;

export type GetTasksSchema = z.infer<typeof getTasksSchema>;
