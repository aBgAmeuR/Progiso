import { Prisma } from '@prisma/client';

import { getColumnsWithTasksQuery } from '@/features/tasks/services';

export type TCreateTask = {
  title: string;
  content?: string;
  tagId?: string;
  assigneeIds: string[];
};

export type TColumn = Prisma.ColumnGetPayload<typeof getColumnsWithTasksQuery>;

export type TTask = TColumn['tasks'][0];
