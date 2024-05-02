import { Prisma } from '@prisma/client';

import { getColumnsWithTasksQuery } from '@/features/tasksv1/services';

export type TCreateTask = {
  title: string;
  content?: string;
  tagId?: string;
  assigneeIds: string[];
};

export type TColumn = Prisma.ColumnGetPayload<typeof getColumnsWithTasksQuery>;

export type TTask = TColumn['tasks'][0];
