'use server';

import { revalidatePath } from 'next/cache';

import { addProjectMember, changeRoleOfMember, removeMember } from './services';

export const removeMemberAction = async (memberId: string) => {
  const res = await removeMember(memberId);

  if (!res) return null;
  revalidatePath('/members');
  return res;
};

export const addProjectMemberAction = async (name: string, role: string) => {
  const res = await addProjectMember(name, role);

  if (!res) return null;
  revalidatePath('/members');
  return res;
};

export const changeRoleOfMemberAction = async (
  memberId: string,
  role: string
) => {
  const res = await changeRoleOfMember(memberId, role);

  if (!res) return null;
  revalidatePath('/members');
  return res;
};
