import {
  CheckCircle2,
  GitPullRequest,
  GitPullRequestArrow,
  PlusCircle,
} from 'lucide-react';

import { BreadcrumbPage } from '@/components/breadcrumb-page';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { getIssuesAndPRStats } from '@/lib/github';

export default async function RepoPage() {
  const issueAndPRStats = await getIssuesAndPRStats();
  // const commitsStats = await getCommitsStats();

  const progressPR = Math.round(
    (issueAndPRStats.openPullRequests.totalCount /
      issueAndPRStats.closedPullRequests.totalCount) *
      100
  );
  const progressIssues = Math.round(
    (issueAndPRStats.openIssues.totalCount /
      issueAndPRStats.closedIssues.totalCount) *
      100
  );

  return (
    <main className="flex w-[calc(100vw-193px)] flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <BreadcrumbPage pageName="Repository" />
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Repository</h1>
            <p className="text-muted-foreground text-sm">
              View your repository stats
            </p>
          </div>
        </div>
      </div>
      <div>
        <Card>
          <CardHeader className="bg-muted/20 p-4">
            <h2 className="text-lg font-semibold">Overview</h2>
          </CardHeader>
          <Separator />
          <CardContent className="grid grid-cols-2 p-0">
            <div className="space-y-2 px-4 py-6">
              <Progress value={progressPR} />
              <p className="text-muted-foreground">
                <span className="text-foreground font-semibold">
                  {issueAndPRStats.openPullRequests.totalCount}
                </span>{' '}
                Active Pull Requests
              </p>
            </div>
            <div className="space-y-2 px-4 py-6">
              <Progress value={progressIssues} />
              <p className="text-muted-foreground">
                <span className="text-foreground font-semibold">
                  {issueAndPRStats.openIssues.totalCount}
                </span>{' '}
                Active Issues
              </p>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="grid grid-cols-4 divide-x p-0">
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex items-center gap-1">
                <GitPullRequestArrow size={16} className="text-primary" />
                <p className="font-semibold">
                  {issueAndPRStats.openPullRequests.totalCount}
                </p>
              </div>
              <p>Open PRs</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex items-center gap-1">
                <GitPullRequest size={16} className="text-primary" />
                <p className="font-semibold">
                  {issueAndPRStats.closedPullRequests.totalCount}
                </p>
              </div>
              <p>Merged PRs</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex items-center gap-1">
                <PlusCircle size={16} className="text-primary" />
                <p className="font-semibold">
                  {issueAndPRStats.openIssues.totalCount}
                </p>
              </div>
              <p>New Issues</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <div className="flex items-center gap-1">
                <CheckCircle2 size={16} className="text-primary" />
                <p className="font-semibold">
                  {issueAndPRStats.closedIssues.totalCount}
                </p>
              </div>
              <p>Closed Issues</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
