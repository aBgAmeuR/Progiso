import { getSelectedProject } from '../projects';
import { GetTasksSchema } from './types';

import { getServerSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const getProjectMembers = async (input: GetTasksSchema) => {
  const session = await getServerSession();
  if (!session) return null;

  const { page, per_page, role, name, order_role, order_name } = input;

  const members = await prisma.projectMember.findMany({
    where: {
      projectId: session.user.selectProject?.id,
      role: { contains: role },
      user: {
        name: { contains: name },
      },
    },
    select: {
      user: {
        select: {
          id: true,
          image: true,
          name: true,
        },
      },
      role: true,
    },
    skip: (page - 1) * per_page,
    take: per_page,
    orderBy: {
      role: order_role,
      user: { name: order_name },
    },
  });

  const data: Array<{
    id: string;
    name: string;
    role: string;
    image: string;
  }> = [];

  members.forEach((member) => {
    data.push({
      id: member.user.id,
      name: member.user.name as string,
      role: member.role,
      image: member.user.image as string,
    });
  });

  const rowCount = await prisma.projectMember.count({
    where: {
      projectId: session.user.selectProject?.id,
      role: { contains: role },
      user: {
        name: { contains: name },
      },
    },
  });

  const pageCount = Math.ceil(rowCount / per_page);

  return {
    data,
    pageCount,
  };
};

export const getProjectRoles = async () => {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) return null;

  const roles = [
    { role: 'ADMIN' },
    { role: 'DEVELOPPER' },
    { role: 'TESTER' },
    { role: 'VISITOR' },
  ];

  return roles;
};

export const changeRoleOfMember = async (memberId: string, role: string) => {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) return null;

  const res = await prisma.projectMember.updateMany({
    where: {
      projectId: selectedProject.id,
      userId: memberId,
    },
    data: {
      role: role,
    },
  });

  return res;
};
