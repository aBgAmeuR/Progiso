import React from 'react';
import { revalidatePath } from 'next/cache';

import { getMessagesOfConversation, sendMessage } from '../services';
import { MessageCard } from './message-card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getServerSession } from '@/lib/auth';

type TMessagesContainerProps = {
  conversationId: string;
};

export const MessagesContainer = async ({
  conversationId,
}: TMessagesContainerProps) => {
  if (!conversationId) return null;
  const messages = await getMessagesOfConversation(conversationId);
  const session = await getServerSession();
  if (!session) return null;

  const onSubmit = async (formData: FormData) => {
    'use server';
    const content = formData.get('content') as string;

    if (!content || !conversationId) return;

    await sendMessage(conversationId, content);
    revalidatePath('/messages');
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <ScrollArea className="flex-1 py-4 pr-4" scrollBottom>
        <div className="flex flex-1 flex-col gap-4">
          {messages?.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              direction={message.user.id === session.user.id ? 'right' : 'left'}
            />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <form className="flex gap-2" action={onSubmit}>
        <Input
          name="content"
          type="text"
          placeholder="Type a message..."
          min={1}
          max={1024}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};
