import { icons } from 'lucide-react';

import { CardFooter } from '@/components/ui/card';
import { TIssuesAndPRStats } from '@/lib/github';

type TCardFooterContent = Array<{
  icon: keyof typeof icons;
  data: number;
  label: string;
}>;

type TOverviewSectionFooterProps = {
  data: TIssuesAndPRStats;
};

export const OverviewSectionFooter = ({
  data,
}: TOverviewSectionFooterProps) => {
  const cardFooterContent = [
    {
      icon: 'GitPullRequestArrow',
      data: data.openPullRequests.totalCount as number,
      label: 'Open PRs',
    },
    {
      icon: 'GitPullRequest',
      data: data.closedPullRequests.totalCount as number,
      label: 'Merged PRs',
    },
    {
      icon: 'CirclePlus',
      data: data.openIssues.totalCount as number,
      label: 'New Issues',
    },
    {
      icon: 'CircleCheck',
      data: data.closedIssues.totalCount as number,
      label: 'Closed Issues',
    },
  ] satisfies TCardFooterContent;

  return (
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
  );
};
