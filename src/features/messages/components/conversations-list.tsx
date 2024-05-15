import { getConversations } from '../services';
import { ConversationCard } from './conversation-card';

import { getServerSession } from '@/lib/auth';
import { cn } from '@/lib/utils';

type TConversationListProps = {
  selectedConversationId: string;
  className?: string;
  slice?: number;
};

export const ConversationList = async ({
  selectedConversationId,
  className,
  slice,
}: TConversationListProps) => {
  const conversations = await getConversations();
  if (!conversations) return null;

  const session = await getServerSession();
  if (!session) return null;

  const sliceConversations = slice
    ? conversations.slice(0, slice)
    : conversations;

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {sliceConversations.length > 0 ? (
        sliceConversations.map((conversation) => (
          <ConversationCard
            key={conversation.id}
            conversation={conversation}
            currentUserName={session.user.name}
            isSelected={selectedConversationId === conversation.id}
          />
        ))
      ) : (
        <div className="pt-4 text-center text-sm text-gray-500">
          No conversations yet
        </div>
      )}
    </div>
  );
};
