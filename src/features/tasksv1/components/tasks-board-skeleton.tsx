import { Skeleton } from '@/components/ui/skeleton';

export const TasksBoardSkeleton = () => {
  return (
    <div className="flex size-full flex-col gap-4">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <h1 className="text-lg font-semibold md:text-2xl">Loading...</h1>
    </div>
  );
};
