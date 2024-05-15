import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type TProjectCardSkeletonProps = {
  variant?: 'grid' | 'list';
};

export const ProjectCardSkeleton = ({
  variant = 'grid',
}: TProjectCardSkeletonProps) => {
  return (
    <Card
      className={cn(
        'prose dark:prose-invert lg:prose-xl text-foreground hover:border-primary',
        variant === 'list' && 'grid grid-cols-3'
      )}
    >
      <CardHeader className="flex h-20 flex-row items-center gap-2 p-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex w-10/12 flex-col">
          <Skeleton className="h-4 w-32" />
        </div>
      </CardHeader>
      {variant === 'grid' ? (
        <CardContent className="h-12 p-4 pt-0">
          <Skeleton className="h-full w-32 rounded-xl" />
        </CardContent>
      ) : null}
      <CardFooter className={cn('p-4 pt-0', variant === 'list' && 'p-0')}>
        <Skeleton className="h-4 w-52" />
      </CardFooter>
    </Card>
  );
};
