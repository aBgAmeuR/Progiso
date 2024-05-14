import { getProgressValue } from '../utils';

import { CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TIssuesAndPRStats } from '@/lib/github';

type TCardContentContent = Array<{
  progressValue: number;
  data: number;
  label: string;
}>;

type TOverviewSectionContentProps = {
  data: TIssuesAndPRStats;
};

export const OverviewSectionContent = ({
  data,
}: TOverviewSectionContentProps) => {
  const progressPR = getProgressValue(
    data.openPullRequests.totalCount,
    data.closedPullRequests.totalCount
  );
  const progressIssues = getProgressValue(
    data.openIssues.totalCount,
    data.closedIssues.totalCount
  );

  const cardContentContent = [
    {
      progressValue: progressPR,
      data: data.openPullRequests.totalCount,
      label: 'Active Pull Requests',
    },
    {
      progressValue: progressIssues,
      data: data.openIssues.totalCount,
      label: 'Active Issues',
    },
  ] satisfies TCardContentContent;

  return (
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
  );
};
