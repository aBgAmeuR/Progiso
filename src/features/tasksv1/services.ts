import { TColumn, TCreateTask, TTask } from '@/features/tasksv1/types';
import { getServerSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const createTask = async (data: TCreateTask) => {
  const session = await getServerSession();
  if (!session) return null;
  const selectedProject = session.user.selectProject;
  if (!selectedProject) return null;

  const firstColumn = await prisma.column.findMany({
    where: {
      projectId: selectedProject.id,
    },
    orderBy: {
      order: 'asc',
    },
    select: {
      id: true,
    },
  });

  if (!firstColumn[0]) return null;

  const taskCount = await prisma.task.count({
    where: {
      columnId: firstColumn[0].id,
    },
  });

  const task = await prisma.task.create({
    data: {
      title: data.title,
      content: data.content,
      assignees: {
        create: {
          userId: session.user.id,
        },
      },
      columnId: firstColumn[0].id || '',
      tagId: data.tagId,
      order: taskCount,
    },
  });

  return task;
};

export const getColumnsWithTasksQuery = {
  include: {
    tasks: {
      orderBy: {
        order: 'asc',
      },
      include: {
        assignees: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        tag: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    },
  },
  orderBy: {
    order: 'asc',
  },
} as const;

export const getColumnsWithTasks = async () => {
  const columns = await prisma.column.findMany(getColumnsWithTasksQuery);
  return columns;
};

export const updateListOrder = async (columns: TColumn[]) => {
  const lists = await prisma.$transaction(
    columns.map((column, index) =>
      prisma.column.update({
        where: {
          id: column.id,
        },
        data: {
          order: index,
        },
      })
    )
  );

  return lists;
};

export const updateTaskOrder = async (tasks: TTask[]) => {
  const updatedTasks = await prisma.$transaction(
    tasks.map((task, index) =>
      prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          order: index,
          columnId: task.columnId,
        },
      })
    )
  );

  return updatedTasks;
};

export const changeTitleOfColumn = async (columnId: string, title: string) => {
  const column = await prisma.column.update({
    where: {
      id: columnId,
    },
    data: {
      title,
    },
  });

  return column;
};
