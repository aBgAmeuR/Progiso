import { BoardCardSkeleton } from '@/components/board-card-skeleton';
import { CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const MembersSkeleton = () => {
  return (
    <BoardCardSkeleton headerText="Members" footerText="View Team">
      <CardContent className="flex h-3/5 flex-col gap-2.5 p-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </BoardCardSkeleton>
  );
};
