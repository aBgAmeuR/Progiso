import { BoardCardSkeleton } from '@/components/board-card-skeleton';
import { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export const CommitSectionSkeleton = () => {
  return (
    <BoardCardSkeleton
      headerText="Last Commits"
      footerText="View More Commits"
      className="col-span-2"
    >
      <CardContent className="flex flex-col gap-3 divide-y px-4 py-3">
        <Skeleton className="h-[52px] w-full" />
        <Separator />
        <Skeleton className="h-[52px] w-full" />
      </CardContent>
    </BoardCardSkeleton>
  );
};
