import { icons } from 'lucide-react';

import { getProgressValue } from '../utils';

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

type TCardContentContent = Array<{
  progressValue: number;
  data: number;
  label: string;
}>;

type TCardFooterContent = Array<{
  icon: keyof typeof icons;
  data: number;
  label: string;
}>;

export const OverviewSection = async () => {
  const issueAndPRStats = await getIssuesAndPRStats();

  const progressPR = getProgressValue(
    issueAndPRStats.openPullRequests.totalCount,
    issueAndPRStats.closedPullRequests.totalCount
  );
  const progressIssues = getProgressValue(
    issueAndPRStats.openIssues.totalCount,
    issueAndPRStats.closedIssues.totalCount
  );

  const cardContentContent = [
    {
      progressValue: progressPR,
      data: issueAndPRStats.openPullRequests.totalCount,
      label: 'Active Pull Requests',
    },
    {
      progressValue: progressIssues,
      data: issueAndPRStats.openIssues.totalCount,
      label: 'Active Issues',
    },
  ] satisfies TCardContentContent;

  const cardFooterContent = [
    {
      icon: 'GitPullRequestArrow',
      data: issueAndPRStats.openPullRequests.totalCount as number,
      label: 'Open PRs',
    },
    {
      icon: 'GitPullRequest',
      data: issueAndPRStats.closedPullRequests.totalCount as number,
      label: 'Merged PRs',
    },
    {
      icon: 'CirclePlus',
      data: issueAndPRStats.openIssues.totalCount as number,
      label: 'New Issues',
    },
    {
      icon: 'CircleCheck',
      data: issueAndPRStats.closedIssues.totalCount as number,
      label: 'Closed Issues',
    },
  ] satisfies TCardFooterContent;

  return (
    <Card>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Overview</h2>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-2 p-0">
        {cardContentContent.map((content) => (
          <div key={content.label} className="space-y-2 px-4 py-6">
            <Progress value={content.progressValue} />
            <p className="text-muted-foreground">
              <span className="text-foreground font-semibold">
                {content.data}
              </span>
              {` ${content.label}`}
            </p>
          </div>
        ))}
      </CardContent>
      <Separator />
      <CardFooter className="grid grid-cols-4 divide-x p-0">
        {cardFooterContent.map((content) => {
          const Icon = icons[content.icon];
          return (
            <div
              key={content.label}
              className="flex flex-col items-center justify-center p-4"
            >
              <div className="flex items-center gap-1">
                <Icon size={16} className="text-primary" />
                <p className="font-semibold">{content.data}</p>
              </div>
              <p>{content.label}</p>
            </div>
          );
        })}
      </CardFooter>
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
