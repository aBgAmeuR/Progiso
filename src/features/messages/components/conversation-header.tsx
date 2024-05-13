import { getConversation } from '../services';
import { DeleteConversationBtn } from './delete-conversation-btn';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type TConversationHeaderProps = {
  id: string | null;
};

export const ConversationHeader = async ({ id }: TConversationHeaderProps) => {
  if (!id) return null;
  const conversation = await getConversation(id);

  return (
    <div className="flex size-full items-center justify-between gap-3 p-4">
      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage src={conversation?.users[0].user.image || ''} />
          <AvatarFallback>
            {conversation?.users[0].user.name &&
              conversation?.users[0].user.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">
            {conversation?.title || conversation?.users[0].user.name}
          </h2>
          {conversation?.messages[0]?.created_at && (
            <p className="text-muted-foreground line-clamp-1 text-sm">
              {`${conversation.messages[0]?.user.name}: ${conversation.messages[0]?.content}`}
            </p>
          )}
        </div>
      </div>
      <DeleteConversationBtn conversationId={id} />
    </div>
  );
};
