import { BoardCardSkeleton } from '@/components/board-card-skeleton';
import { CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ConversationCardSkeleton = () => {
  return (
    <BoardCardSkeleton
      headerText="Last Conversation"
      footerText="View Conversations"
    >
      <CardContent className="flex h-[153px] w-full flex-col gap-4 pt-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </BoardCardSkeleton>
  );
};
