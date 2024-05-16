import { icons } from 'lucide-react';

import { getProgressValue } from '../utils';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getTasksCount } from '@/features/tasks/services';
import { getIssuesAndPRStats } from '@/lib/github';
import { cn } from '@/lib/utils';

type TPrIssueCardProps = {
  className?: string;
};

export const PrIssueCard = async ({ className }: TPrIssueCardProps) => {
  const issueAndPRStats = await getIssuesAndPRStats();
  const countTasks = await getTasksCount();
  if (!issueAndPRStats || !countTasks) return null;

  const progressPR = getProgressValue(
    issueAndPRStats.openPullRequests.totalCount,
    issueAndPRStats.closedPullRequests.totalCount
  );
  const progressIssues = getProgressValue(
    issueAndPRStats.openIssues.totalCount,
    issueAndPRStats.closedIssues.totalCount
  );

  return (
    <div className={cn('grid grid-cols-3 gap-6', className)}>
      <SimpleCard
        progressValue={progressPR}
        value={issueAndPRStats.openPullRequests.totalCount}
        text={`Active Pull Requests`}
        title="Pull Requests"
        icon="GitPullRequest"
      />
      <SimpleCard
        progressValue={progressIssues}
        value={issueAndPRStats.openIssues.totalCount}
        text={`Active Issues`}
        title="Issues"
        icon="CirclePlus"
      />
      <SimpleCard
        progressValue={
          (1 - countTasks.completeCountTasks / countTasks.countTasks) * 100
        }
        value={countTasks.countTasks - countTasks.completeCountTasks}
        text={`Active Tasks`}
        title="Tasks"
        icon="ListTodo"
      />
    </div>
  );
};

type TSimpleCardProps = {
  title: string;
  text: string;
  value: number;
  progressValue: number;
  icon: keyof typeof icons;
};

const SimpleCard = ({
  progressValue,
  text,
  title,
  value,
  icon,
}: TSimpleCardProps) => {
  const Icon = icons[icon];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="text-muted-foreground size-4" />
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-1 flex gap-1 whitespace-nowrap pb-0.5">
          <span className="text-foreground">{value}</span>
          {text}
        </p>
        <Progress value={progressValue} />
      </CardContent>
    </Card>
  );
};
