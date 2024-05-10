import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  GitPullRequest,
  GitPullRequestArrow,
  PlusCircle,
} from 'lucide-react';
import Link from 'next/link';

import { BreadcrumbPage } from '@/components/breadcrumb-page';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { TCommit } from '@/features/repository/type';
import { getCommitsStats, getIssuesAndPRStats } from '@/lib/github';

export default async function RepoPage() {
  const issueAndPRStats = await getIssuesAndPRStats();
  const commitsStats = await getCommitsStats();

  const progressPR = Math.round(
    (issueAndPRStats.openPullRequests.totalCount /
      (issueAndPRStats.closedPullRequests.totalCount +
        issueAndPRStats.openPullRequests.totalCount)) *
      100
  );
  const progressIssues = Math.round(
    (issueAndPRStats.openIssues.totalCount /
      (issueAndPRStats.closedIssues.totalCount +
        issueAndPRStats.openIssues.totalCount)) *
      100
  );

  /**
   *
   * Return 3d ago
   * or 4h ago
   * or 4min ago
   * or now if < 1min
   * or 1w ago
   */
  const getTimeAgo = (date: Date) => {
    const formatDate = new Date(date);
    const currentDate = new Date();
    const secondsAgo = Math.floor(
      (currentDate.getTime() - formatDate.getTime()) / 1000
    );

    const intervals = [
      { label: 'w', seconds: 604800 },
      { label: 'd', seconds: 86400 },
      { label: 'h', seconds: 3600 },
      { label: 'min', seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(secondsAgo / interval.seconds);
      if (count > 0) {
        return `${count}${interval.label} ago`;
      }
    }

    return 'now';
  };

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
      <div className="space-y-6">
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
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader className="bg-muted/20 p-4">
              <h2 className="text-lg font-semibold">Last Commits</h2>
            </CardHeader>
            <Separator />
            <CardContent className="divide-y p-0">
              {commitsStats.slice(0, 5).map((commit: TCommit) => (
                <div
                  key={commit.node.abbreviatedOid}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="line-clamp-1">{commit.node.message}</p>
                    <div className="grid grid-cols-[1fr_minmax(100px,_1fr)] gap-3">
                      <div className="flex items-center gap-2">
                        <p className="text-muted-foreground whitespace-nowrap">{`${getTimeAgo(commit.node.committedDate)} by ${commit.node.author.name}`}</p>
                        <Avatar className="size-6">
                          <AvatarImage src={commit.node.author.avatarUrl} />
                          <AvatarFallback>
                            {commit.node.author.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      {commit.node.status?.state === 'SUCCESS' ? (
                        <div className="flex items-center gap-1">
                          <div className="size-2 rounded-full bg-green-500"></div>
                          <p className="text-muted-foreground">Success</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <div className="size-2 rounded-full bg-red-500"></div>
                          <p className="text-muted-foreground">Failure</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="link"
                    size="icon"
                    className="hover:bg-secondary"
                    asChild
                  >
                    <Link href={commit.node.commitUrl} target="_blank">
                      <ExternalLink />
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
            <Separator />
            <CardFooter className="group flex justify-center divide-y p-4">
              <Link href="/repo/commits" className="flex items-center gap-2">
                <p className="text-primary font-semibold">View More Commits</p>
                <ArrowRight
                  size={20}
                  className="text-primary transition-transform delay-75 group-hover:translate-x-1"
                />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
