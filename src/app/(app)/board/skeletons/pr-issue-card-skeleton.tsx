import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

export const PrIssueCardSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <Skeleton className="h-5 w-20" />
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <Skeleton className="h-7 w-52" />
          <Progress value={0} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <Skeleton className="h-5 w-20" />
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <Skeleton className="h-7 w-52" />
          <Progress value={0} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <Skeleton className="h-5 w-20" />
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <Skeleton className="h-7 w-52" />
          <Progress value={0} />
        </CardContent>
      </Card>
    </div>
  );
};
