import { Icons } from '../icons';
import { Skeleton } from '../ui/skeleton';

export const ProjectSelectorSkeleton = () => {
  return (
    <>
      <Icons.slash className="mx-1 size-4" />
      <div className="flex items-center gap-2">
        <Skeleton className="size-6 rounded-full" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-5 w-[20px]" />
        </div>
      </div>
    </>
  );
};
