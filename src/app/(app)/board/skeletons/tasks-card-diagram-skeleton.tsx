import { BoardCardSkeleton } from '@/components/board-card-skeleton';
import { CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const TasksCardDiagramSkeleton = () => {
  return (
    <BoardCardSkeleton
      headerText="Distribution of tasks"
      footerText="View Kanban"
      className="col-span-2"
    >
      <CardContent className=" flex h-3/5 w-full items-center justify-around px-4 py-1">
        <Skeleton className="h-4/5 w-20" />
        <Skeleton className="h-4/5 w-20" />
        <Skeleton className="h-4/5 w-20" />
        <Skeleton className="h-4/5 w-20" />
      </CardContent>
    </BoardCardSkeleton>
  );
};
