import { getConversations } from '../services';
import { ConversationCard } from './conversation-card';

import { getServerSession } from '@/lib/auth';

type TConversationListProps = {
  selectedConversationId: string;
};

export const ConversationList = async ({
  selectedConversationId,
}: TConversationListProps) => {
  const conversations = await getConversations();
  if (!conversations) return null;

  const session = await getServerSession();
  if (!session) return null;

  return (
    <div className="flex w-full flex-col gap-2">
      {conversations?.map((conversation) => (
        <ConversationCard
          key={conversation.id}
          conversation={conversation}
          currentUserName={session.user.name}
          isSelected={selectedConversationId === conversation.id}
        />
      ))}
    </div>
  );
};
