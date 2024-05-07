import { ICard, IColumn, INewCard } from './types';

import { getSelectProject, getServerSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const getColumns = async () => {
  const selectProject = await getSelectProject();
  if (!selectProject) return null;

  const columns = await prisma.column.findMany({
    where: {
      projectId: selectProject.id,
    },
    orderBy: {
      order: 'asc',
    },
    select: {
      id: true,
      title: true,
      order: true,
      headingColor: true,
    },
  });

  return columns;
};

export const getCards = async () => {
  const selectProject = await getSelectProject();
  if (!selectProject) return null;

  const cards = await prisma.task.findMany({
    where: {
      columnDetail: {
        projectId: selectProject.id,
      },
    },
    orderBy: {
      order: 'asc',
    },
    select: {
      id: true,
      title: true,
      column: true,
      order: true,
      tag: {
        select: {
          name: true,
          color: true,
        },
      },
    },
  });

  return cards;
};

export const createCard = async (card: INewCard) => {
  const session = await getServerSession();
  if (!session) return null;
  const tagNames = card.tag ? (card.tag.name ? card.tag.name : '') : '';

  const order = await prisma.task.count({
    where: {
      column: card.column,
    },
  });

  const res = await prisma.task.create({
    data: {
      title: card.title,
      column: card.column,
      order: order + 1,
      tagName: tagNames,
      userId: session.user.id,
    },
  });

  return res;
};

export const updateCard = async (card: ICard) => {
  const res = await prisma.task.update({
    where: {
      id: card.id,
    },
    data: {
      title: card.title,
      column: card.column,
      order: card.order,
    },
  });

  return res;
};

export const deleteCard = async (id: string) => {
  const res = await prisma.task.delete({
    where: {
      id,
    },
  });

  return res;
};

export const createColumn = async (title: string, headingColor: string) => {
  const selectProject = await getSelectProject();
  if (!selectProject) return null;

  const order = await prisma.column.count({
    where: {
      projectId: selectProject.id,
    },
  });

  const res = await prisma.column.create({
    data: {
      title,
      order: order + 1,
      projectId: selectProject.id,
      headingColor,
    },
  });

  return res;
};

export const updateColumn = async (column: Omit<IColumn, 'order'>) => {
  const res = await prisma.column.update({
    where: {
      id: column.id,
    },
    data: {
      title: column.title,
      headingColor: column.headingColor,
    },
  });

  return res;
};

export const deleteColumn = async (id: string) => {
  const res = await prisma.column.delete({
    where: {
      id,
    },
  });

  return res;
};

export const switchColumns = async (
  id: string,
  direction: 'left' | 'right'
) => {
  const selectProject = await getSelectProject();
  if (!selectProject) return null;

  const column = await prisma.column.findUnique({
    where: {
      id,
      projectId: selectProject.id,
    },
  });

  if (!column) return null;

  const columns = await prisma.column.findMany({
    where: {
      projectId: column.projectId,
    },
    orderBy: {
      order: 'asc',
    },
  });

  const currentIndex = columns.findIndex((c) => c.id === id);
  const targetIndex =
    direction === 'left'
      ? Math.max(0, currentIndex - 1)
      : Math.min(columns.length - 1, currentIndex + 1);

  const updatedColumns = [...columns];
  const [movedColumn] = updatedColumns.splice(currentIndex, 1);
  updatedColumns.splice(targetIndex, 0, movedColumn);

  await Promise.all(
    updatedColumns.map((c, i) =>
      prisma.column.update({
        where: {
          id: c.id,
        },
        data: {
          order: i + 1,
        },
      })
    )
  );

  return updatedColumns;
};
