import { TMessage } from '../types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const formatMessageDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

type TMessageCardProps = {
  message: TMessage;
  direction: 'left' | 'right';
};

export const MessageCard = ({ message, direction }: TMessageCardProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2',
        direction === 'right' ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar className="size-10">
        <AvatarImage src={message.user.image!} />
        <AvatarFallback>
          {message.user.name && message.user.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'flex w-4/5 flex-col gap-1',
          direction === 'right' ? 'items-end' : 'items-start'
        )}
      >
        <p className="bg-secondary rounded-lg p-2">{message.content}</p>
        <p className="text-muted-foreground text-xs">
          {formatMessageDate(message.created_at)}
        </p>
      </div>
    </div>
  );
};
