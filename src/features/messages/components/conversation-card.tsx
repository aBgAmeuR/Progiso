import Link from 'next/link';

import { TConversation } from '../types';

import { UserAvatar } from '@/components/user-avatar';
import { cn } from '@/lib/utils';

type TConversationCardProps = {
  conversation: TConversation;
  currentUserName: string;
  isSelected?: boolean;
};

export const ConversationCard = ({
  conversation,
  currentUserName,
  isSelected,
}: TConversationCardProps) => {
  const users = conversation.users.filter(
    (user) => user.user.name !== currentUserName
  );

  return (
    <Link
      className={cn(
        'hover:bg-secondary flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2',
        isSelected && 'bg-secondary'
      )}
      href={`/messages?id=${conversation.id}`}
    >
      <UserAvatar
        seed={
          conversation.title
            ? conversation.messages[0]?.user.name
            : users[0].user.name
        }
        url={
          conversation.title
            ? conversation.messages[0]?.user.image
            : users[0].user.image
        }
        className="size-8"
      />
      {/* <Avatar className="size-8">
        <AvatarImage
          src={
            conversation.title
              ? conversation.messages[0].user.image!
              : users[0].user.image!
          }
        />
        <AvatarFallback>
          {users[0].user.name && users[0].user.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar> */}
      <div>
        <h2 className="text-lg font-semibold">
          {conversation.title || users[0].user.name}
        </h2>
        {conversation.messages[0]?.created_at && (
          <p className="text-muted-foreground line-clamp-1 text-sm">
            {`${conversation.messages[0]?.user.name}: ${conversation.messages[0]?.content}`}
          </p>
        )}
      </div>
    </Link>
  );
};
