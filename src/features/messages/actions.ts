'use server';

import { createConversation, getMembersListofProject } from './services';

export const createConversationAction = async (data: {
  title?: string | undefined;
  members: string[];
}) => {
  const res = await createConversation(data);

  if (!res) return null;

  return res;
};

export const getMembersListofProjectAction = async () => {
  const res = await getMembersListofProject();

  if (!res) return null;

  return res;
};
