import { OverviewSectionContent } from './overview-section-content';
import { OverviewSectionFooter } from './overview-section-footer';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getIssuesAndPRStats } from '@/lib/github';

export const OverviewSection = async () => {
  const issueAndPRStats = await getIssuesAndPRStats();
  if (!issueAndPRStats) return null;

  return (
    <Card>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Overview</h2>
      </CardHeader>
      <Separator />
      <OverviewSectionContent data={issueAndPRStats} />
      <Separator />
      <OverviewSectionFooter data={issueAndPRStats} />
    </Card>
  );
};

export const OverviewSectionSkeleton = () => {
  return (
    <Card>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Overview</h2>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-2 p-0">
        {[...Array(2)].map((e, i) => (
          <div key={i} className="space-y-2 px-4 py-6">
            <Progress value={0} />
            <Skeleton className="h-6 w-52" />
          </div>
        ))}
      </CardContent>
      <Separator />
      <CardFooter className="grid grid-cols-4 divide-x p-0">
        {[...Array(4)].map((e, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-1 p-4"
          >
            <Skeleton className="h-4 w-9" />
            <Skeleton className="h-6 w-28" />
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};
