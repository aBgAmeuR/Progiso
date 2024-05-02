'use server';

import { revalidatePath } from 'next/cache';

import { changeRoleOfMember, getProjectRoles } from './services';

export const getProjectRolesAction = async () => {
  const res = await getProjectRoles();

  if (!res) return null;

  return res;
};

export const changeRoleOfMemberAction = async (
  memberId: string,
  role: string
) => {
  const res = await changeRoleOfMember(memberId, role);

  if (!res) return null;

  revalidatePath('/team');
  return res;
};
