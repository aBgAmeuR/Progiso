import { getSelectedProject } from '../projects';

import { getServerSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const getRoleOfCurrentUser = async () => {
  const session = await getServerSession();
  if (!session || !session.user.selectProject) return null;

  const res = await prisma.projectMember.findFirst({
    where: {
      projectId: session.user.selectProject.id,
      userId: session.user.id,
    },
  });

  return res?.role;
};

export const getProjectMembers = async () => {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) return null;

  const members = await prisma.projectMember.findMany({
    where: {
      projectId: selectedProject.id,
    },
    include: {
      user: true,
    },
  });

  return members;
};

export const changeRoleOfMember = async (memberId: string, role: string) => {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) return null;

  const currentUserRole = await getRoleOfCurrentUser();
  if (!currentUserRole || !['OWNER', 'ADMIN'].includes(currentUserRole))
    return null;

  const res = await prisma.projectMember.updateMany({
    where: {
      projectId: selectedProject.id,
      id: memberId,
    },
    data: {
      role: role,
    },
  });

  return res;
};

export const removeMember = async (memberId: string) => {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) return null;

  const currentUserRole = await getRoleOfCurrentUser();
  if (!currentUserRole || !['OWNER', 'ADMIN'].includes(currentUserRole))
    return null;

  const res = await prisma.projectMember.deleteMany({
    where: {
      projectId: selectedProject.id,
      id: memberId,
      role: {
        not: 'OWNER',
      },
    },
  });

  return res;
};

export const addProjectMember = async (name: string, role: string) => {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) return null;

  const currentUserRole = await getRoleOfCurrentUser();
  if (!currentUserRole || !['OWNER', 'ADMIN'].includes(currentUserRole))
    return null;

  const user = await prisma.user.findFirst({
    where: {
      name: name,
    },
  });

  if (!user) throw new Error('User not found');
  if (role === 'OWNER') throw new Error('Cannot add owner');

  const res = await prisma.projectMember.create({
    data: {
      projectId: selectedProject.id,
      userId: user.id,
      role: role,
    },
  });

  return res;
};
