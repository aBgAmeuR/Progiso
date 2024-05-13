'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  createConversation,
  deleteConversation,
  getConversation,
  getConversations,
  getMembersListofProject,
  getMessagesOfConversation,
  sendMessage,
} from './services';

export const createConversationAction = async (data: {
  title?: string | undefined;
  members: string[];
}) => {
  const res = await createConversation(data);

  if (res && res !== 'ok' && res.id) redirect(`/messages?id=${res.id}`);

  revalidatePath('/messages');
  return res;
};

export const getMembersListofProjectAction = async () => {
  const res = await getMembersListofProject();

  if (!res) return null;

  return res;
};

export const getConversationsAction = async () => {
  const res = await getConversations();

  if (!res) return null;

  return res;
};

export const getConversationAction = async (
  id: string,
  withCurentUser?: boolean
) => {
  const res = await getConversation(id, withCurentUser);

  if (!res) return null;

  return res;
};

export const sendMessageAction = async (
  conversationId: string,
  content: string
) => {
  console.log('sendMessageAction', conversationId, content);

  const res = await sendMessage(conversationId, content);

  if (!res) return null;

  return res;
};

export const getMessagesOfConversationAction = async (
  conversationId: string
) => {
  const res = await getMessagesOfConversation(conversationId);

  if (!res) return null;

  return res;
};

export const deleteConversationAction = async (id: string) => {
  const res = await deleteConversation(id);

  if (!res) return null;

  redirect('/messages');
};
