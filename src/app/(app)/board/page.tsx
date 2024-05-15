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
        <PrIssueCard className="col-span-3 gap-4" />
        <div className="grid h-[296px] grid-cols-3 gap-4">
          <TasksCardDiagram className="col-span-2" />
          <MembersList />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <CommitsSection nbCommits={2} className="col-span-2" />
          <ConversationListCard />
        </div>
      </div>
      {/* <div className="flex flex-col gap-4">
        <PrIssueCardSkeleton />
        <div className="grid h-[296px] grid-cols-3 gap-4">
          <TasksCardDiagram className="col-span-2" />
          <MembersList />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <CommitsSection nbCommits={2} className="col-span-2" />
          <ConversationListCard />
        </div>
      </div> */}
    </main>
  );
}
