import { Skeleton } from '@/components/ui/skeleton';

export const ConversationListSkeleton = async () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
};
