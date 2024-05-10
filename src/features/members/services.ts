import { getSelectedProject } from '../projects';

import prisma from '@/lib/prisma';

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
