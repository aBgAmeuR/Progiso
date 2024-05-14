import { TContributor } from '../type';
import { getProgressContributorValue } from '../utils';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/user-avatar';
import { getContributorsOfProject } from '@/lib/github';

export const TopContributorsSection = async () => {
  const contributors = await getContributorsOfProject();
  if (!contributors) return null;

  return (
    <Card>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Top contributors</h2>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-3 p-4">
        {contributors.slice(0, 6).map((contributor: TContributor) => (
          <div key={contributor.id} className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <p>{contributor.login}</p>
              <UserAvatar
                url={contributor.avatar_url}
                seed={contributor.login}
                className="size-6"
              />
            </div>
            <div className="flex items-center gap-4">
              <Progress
                value={getProgressContributorValue(contributor, contributors)}
                className="h-4 rounded-md bg-transparent *:rounded-md"
              />
              <p className="text-muted-foreground">
                {contributor.contributions}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const TopContributorsSectionSkeleton = () => {
  return (
    <Card>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Top contributors</h2>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-3 p-4">
        {[...Array(6)].map((e, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <Skeleton className="h-6 w-16" />
            <div className="flex items-center gap-4">
              <Progress
                value={(i - 6) * -16}
                className="*:bg-primary/10 h-4 rounded-md bg-transparent *:animate-pulse *:rounded-md"
              />
              <Skeleton className="h-6 w-4" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
