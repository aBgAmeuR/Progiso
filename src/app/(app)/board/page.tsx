import { Suspense } from 'react';

import { CommitSectionSkeleton } from './skeletons/commit-section-skeleton';
import { ConversationCardSkeleton } from './skeletons/conversation-card-skeleton';
import { MembersSkeleton } from './skeletons/members-skeleton';
import { PrIssueCardSkeleton } from './skeletons/pr-issue-card-skeleton';
import { TasksCardDiagramSkeleton } from './skeletons/tasks-card-diagram-skeleton';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { MembersList } from '@/features/members/components/members-list';
import { ConversationListCard } from '@/features/messages/components/conversations-list-card';
import { CommitsSection } from '@/features/repository/components/commits-section';
import { PrIssueCard } from '@/features/repository/components/pr-issue-card';
import { TasksCardDiagram } from '@/features/tasks/components/tasks-card-diagram';

export default async function BoardPage() {
  return (
    <main className="flex w-[calc(100vw-193px)] flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/board">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              View your dashboard stats
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<PrIssueCardSkeleton />}>
          <PrIssueCard className="col-span-3 gap-4" />
        </Suspense>
        <div className="grid h-[296px] grid-cols-3 gap-4">
          <Suspense fallback={<TasksCardDiagramSkeleton />}>
            <TasksCardDiagram className="col-span-2" />
          </Suspense>
          <Suspense fallback={<MembersSkeleton />}>
            <MembersList />
          </Suspense>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Suspense fallback={<CommitSectionSkeleton />}>
            <CommitsSection nbCommits={2} className="col-span-2" />
          </Suspense>
          <Suspense fallback={<ConversationCardSkeleton />}>
            <ConversationListCard />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
