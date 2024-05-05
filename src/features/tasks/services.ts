import { ICard, IColumn } from './types';

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

export const updateColumn = async (column: IColumn) => {
  const res = await prisma.column.update({
    where: {
      id: column.id,
    },
    data: {
      title: column.title,
      order: column.order,
      headingColor: column.headingColor,
    },
    select: {
      id: true,
      title: true,
      order: true,
      headingColor: true,
    },
  });

  return res;
};

export const createCard = async (card: Omit<ICard, 'id'>) => {
  const session = await getServerSession();
  if (!session) return null;
  const tagNames = card.tag ? (card.tag.name ? card.tag.name : '') : '';

  const res = await prisma.task.create({
    data: {
      title: card.title,
      column: card.column,
      order: card.order,
      tagName: tagNames,
      userId: session.user.id,
    },
  });

  return res;
};
